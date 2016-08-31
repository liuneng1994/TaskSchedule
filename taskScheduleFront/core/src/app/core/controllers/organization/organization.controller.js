/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function () {
  'use strict';

  angular.module('core')
    .controller('OrganizationIndexCtrl', [
      'organizationService',
      '$rootScope',
      '$scope',
      '$filter',
      '$state',
      '$templateCache',
      'kendoGridService',
      'Notification',
      OrganizationIndexCtrl]);

  angular.module('core')
    .controller('OrganizationEditCtrl', [
      '$stateParams',
      'organizationService',
      '$scope',
      '$filter',
      '$state',
      '$templateCache',
      'kendoGridService',
      OrganizationEditCtrl]);

  /** @ngInject */
  function OrganizationIndexCtrl(organizationService, $rootScope, $scope, $filter, $state,$templateCache, kendoGridService, Notification) {
    var vm = this;

    vm.gridShow = function (dataItem) {
      if (dataItem.id != '' && dataItem.id != null) {
        $state.go("app.organization.edit", {id: dataItem.id})
      }
    }

    vm.parentEditor = function (container, options) {
      var parentDropList = $('<input data-bind="value: parentId"/>')
        .appendTo(container)
        .kendoDropDownList({
          dataTextField: "name",
          dataValueField: "id",
          select: function (te) {
            options.model.parentOrg = this.dataItem(te.item.index());
            // console.log(options.model)
          }
        });
      // console.log(options.model)
      var ddl = parentDropList.data("kendoDropDownList");
      ddl.setDataSource({id: -1, name: null, parentId: null, description: null})
      organizationService.findParent(options.model.id).then(function (data) {
        var tmpFields = data;
        tmpFields.splice(0, 0, {id: -1, name: "", parentId: "", description: ""});
        var tmpFieldIds = [];
        for (var item in tmpFields) {
          tmpFieldIds.push(tmpFields[item].id)
        }
        var ddl = parentDropList.data("kendoDropDownList");
        ddl.setDataSource(tmpFields)
        ddl.select(tmpFieldIds.indexOf(options.model.parentOrg == null ? null : options.model.parentOrg.id));
        ddl.refresh();
      });
    }
    vm.getMainGridOptions = function () {
      var mainGridOptions = kendoGridService.getMainGridOptions();
      mainGridOptions.dataSource.transport = vm.getTransport();
      mainGridOptions.dataSource.schema = vm.getSchema();
      mainGridOptions.columns = vm.getColumns();
      mainGridOptions.editable = vm.getEditable();
      mainGridOptions.edit = function(e) {
        var commandCell = e.container.find("td:last");
        var save =  $filter('translate')('common.save');
        var cancel = $filter('translate')('common.cancel');
        commandCell.html("<a class='btn btn-xs btn-primary k-button k-button-icontext k-grid-update'>"+ save+ "</a><a class='btn btn-xs btn-default k-button k-button-icontext k-grid-cancel'>"+ cancel+ "</a>");
      }
      mainGridOptions.save = function(e){
        e.preventDefault();
        var grid = this;
        var copy = angular.copy(e.model);
        copy.parentId = null;
        organizationService.checkData([copy]).then(function(data){
          if(data.length>0){
            for(var item in data){
              Notification.error(data[item]);
            }
          }else{
            grid.saveChanges();
          }
        });
      }
      return mainGridOptions;
    }

    vm.getTransport = function () {
      var transport = kendoGridService.getTransport(organizationService);
      transport.destroy = function (options) {
        return organizationService.delete(options.data.models).then(function (data) {
          var str = "";
          if (data.length > 0) {
            for (var item in data) {
              str += data[item].name + " "
            }
            str += "有子组织，不可删除。"
          }
          if (str != "") {
            alert(str);
          }
          $scope.grid.dataSource.read();
        }, function (error) {
          options.error(error);
        });
      };
      return transport;
    }

    vm.getSchema = function () {
      var schema = kendoGridService.getSchema();
      schema.model = {
        id: "id",
        fields: {
          name: {
            editable: true,
            validation: {
              required: true
            }
          },
          parentId: {
            editable: true,
            defaultValue: -1
          },
          parentOrg: {
            editable: true,
            defaultValue: {
              name: '',
              parentId: '',
              description: ''
            }
          },
          description: {
            validation: {
              editable: true
            }
          },
          version: {
            editable: false,
            defaultValue: 0
          },
          odr:{
            editable: false,
            defaultValue: 0
          }
        }
      };
      return schema;
    }

    vm.getColumns = function () {
      var columns = [];
      columns = [
        {
          field: "odr",
          title: $filter('translate')('core.organization.odr'),
          width: "10%"
        },
        {
          field: "name",
          title: $filter('translate')('core.organization.name'),
          width: "15%"
        },
        {
          field: "parentOrg.name",
          title: $filter('translate')('core.organization.parent'),
          template: function (dataItem) {
            if (dataItem.parentOrg == null) {
              return $filter('translate')('core.organization.noParentOrg');
            } else {
              return dataItem.parentOrg.name;
            }
          },
          editor: vm.parentEditor,
          width: "20%",
          sortable: false
        },
        {
          field: "description",
          title: $filter('translate')('core.organization.description'),
          width: "45%"
        },
        { 
          title: $filter('translate')('common.options'),
          command: [
            {name: "edit", template: $templateCache.get('kendo-grid-button-edit.html')},
            {name: "destroy", template: $templateCache.get('kendo-grid-button-delete.html')},
            {name: "details", template: $templateCache.get('kendo-grid-button-details.html')}
          ],
          width: "200px"
        }
      ];
      return columns;
    }

    vm.getEditable = function(){
      var editable = {
        confirmation: $filter('translate')('kendo.editable.confirmation'),
        mode:'inline'
      }
      return editable;
    }

    return vm;
  }

  function OrganizationEditCtrl($stateParams, organizationService, $scope, $filter, $state,$templateCache, kendoGridService) {
    var vm = this;
    this.organization = {};
    this.organization.id = $stateParams.id;

    this.edit = function (id) {
      organizationService.edit(id).then(function (data) {
        vm.organization = data;
        vm.oldorganization = angular.copy(vm.organization);
      });
    };

    this.edit(vm.organization.id);

    this.update = function () {
      organizationService.update([vm.organization]).then(function (msg) {
        alert("update ok")
        vm.organization.version = msg[0].version;
      });
      vm.oldorganization = angular.copy(vm.organization);
    };

    this.isChanged = function () {
      return angular.equals(vm.oldorganization, vm.organization);
    }
    this.reset = function () {
      vm.organization = angular.copy(vm.oldorganization);
    };

    this.findParent = function (id) {
      organizationService.findParent(id).then(function (data) {
        // console.log(data);
        vm.parents = data;
      });
    };
    vm.unique = function (list) {
      var res = [];
      var json = {};
      for (var i = 0; i < list.length; i++) {
        if (!json[list[i]]) {
          res.push(list[i]);
          json[list[i]] = 1;
        }
      }
      return res;
    }

    vm.userEditor = function (container, options) {
      if (options.model.orgId != '') {
        $('<span ng-bind="dataItem.name" class="ng-binding"></span>').appendTo(container)
      } else {
        organizationService.findUserNoOrg().then(function (data) {
          var tmpUsers = data;
          var tmpUserIds = [];
          for (var item in tmpUsers) {
            tmpUserIds.push(tmpUsers[item].id)
          }
          var index = tmpUserIds.indexOf(options.model.tmpId);
          var ddl = userDropList.data("kendoDropDownList");
          ddl.setDataSource(tmpUsers);
          ddl.select(index);
          ddl.refresh();
        });
        var userDropList = $('<input required data-bind="value: id"/>')
          .appendTo(container)
          .kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            select: function (te) {
              var user = this.dataItem(te.item.index());
              options.model.tmpId = user.id;
              options.model.loginName = user.loginName;
              options.model.name = user.name; 
              options.model.borthDate = user.borthDate==null?'':new Date(user.borthDate);
              options.model.description = user.description;
              options.model.emailAddress = user.emailAddress;
              options.model.phone = user.phone;
              $scope.grid.refresh();
            }
          });
      }

    }
    vm.getMainGridOptions = function () {
      var mainGridOptions = kendoGridService.getMainGridOptions();
      mainGridOptions.dataSource.transport = vm.getTransport();
      mainGridOptions.dataSource.schema = vm.getSchema();
      mainGridOptions.columns = vm.getColumns();
      return mainGridOptions;
    }

    vm.getTransport = function () {
      var transport = {
        read: function (options) {
          return organizationService.findUserByOrgId(options, vm.organization.id).then(function (data) {
            // console.log(data.list)
            options.success(data);
          }, function (error) {
            options.error(error);
          });
        },
        destroy: function (options) {
          var Ids = [];
          for (var item in options.data.models) {
            Ids.push(options.data.models[item].id)
          }
          return organizationService.deleteUsers(Ids).then(function (data) {
            $scope.grid.dataSource.read();
          }, function (error) {
            options.error(error);
          });
        },
        create: function (options) {
          var tmpIds = [];
          for (var item in options.data.models) {
            tmpIds.push(options.data.models[item].tmpId)
          }
          tmpIds = vm.unique(tmpIds);
          // console.log(tmpIds)
          return organizationService.createUsers(tmpIds, vm.organization.id).then(function (data) {
            $scope.grid.dataSource.read();
          }, function (error) {
            options.error(error);
          });
        },
        parameterMap: function (options, operation) {
          if (operation !== "read" && options.models) {
            return {
              models: kendo.stringify(options.models)
            };
          }
        }
      };
      return transport;
    }

    vm.getSchema = function () {
      var schema = kendoGridService.getSchema();
      schema.parse = function (data) {
        $.each(data.list, function (index, elem) {
          if (data.list[index].borthDate != null) {
            data.list[index].borthDate = new Date(elem.borthDate);
          }
        });
        return data;
      };
      schema.model = {
        id: "id",
        fields: {
          loginName: {editable: false},
          name: {},
          orgId: {editable: false},
          borthDate: {editable: false},
          emailAddress: {editable: false},
          phone: {editable: false},
          tmpId: {}
        }
      };
      return schema;
    }

    vm.getColumns = function () {
      var columns = [];
      columns = [
        {
          field: "name",
          title: $filter('translate')('core.user.name'),
          editor: vm.userEditor
        },
        {
          field: "loginName",
          title: $filter('translate')('core.user.loginName')
        },
        {
          field: "borthDate",
          title: $filter('translate')('core.user.borthDate'),
          format: "{0:yyyy-MM-dd}"
        },
        {
          field: "emailAddress",
          title: $filter('translate')('core.user.emailAddress')
        },
        {
          field: "phone",
          title: $filter('translate')('core.user.phone')
        },
        {
          title: $filter('translate')('common.options'),
          command: [{name: "destroy", template: $templateCache.get('kendo-grid-button-delete.html')}
          ]
        }
      ];
      return columns;
    }

    this.findParent(vm.organization.id);
    return this;
  }

})();