(function () {
  'use strict';

  angular.module('theme').service('kendoGridService', ['$filter', KendoGridService]);

  /** @ngInject */
  function KendoGridService($filter) {

    function translate(key) {
      return $filter('translate')(key);
    }

    var kendoService = this;
    var mainGridOptions = {};

    /**
     * 启用网格复制
     * @return { Object } 返回条件对象
     */
    this.getAllowCopy = function () {
      var allowCopy = {
        delimeter: ',' // 添加分隔符
      };
      return allowCopy;
    }

    /**
     * 显示列菜单，列菜单允许用户显示和隐藏列,过滤和排序(如果启用了过滤和排序)
     * @return { Object } 返回条件对象
     */
    this.getColumnMenu = function () {
      var columnMenu = {
        columns: true,
        filterable: true, // Boolean (default: true) 如果有过滤
        sortable: true, // Boolean (default: true) 如果有排序
        messages: {
          columns: translate('kendo.columnMenu.columns'),
          filter: translate('kendo.columnMenu.filter'),
          sortAscending: translate('kendo.columnMenu.sortAscending'),
          sortDescending: translate('kendo.columnMenu.sortDescending')
        }
      };
      return columnMenu;
    }

    /**
     * 数据源
     * @return { Object } 返回条件对象
     */
    this.getDataSource = function () {
      var dataSource = {
        batch: true,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
      };
      return dataSource;
    }

    /**
     * dataSource.transport
     * @param  { Service } service 传入service
     * @return { Object }         返回dataSource.transport
     */
    this.getTransport = function (service) {
      var transport = {};
      transport.read = function (options) {
        return service.read(options).then(function (data) {
          options.success(data);
        }, function (error) {
          options.error(error);
        });
      };
      transport.update = function (options) {
        return service.update(options.data.models).then(function (data) {
          options.success({
            list: data
          });
        }, function (error) {
          options.error(error);
        });
      };
      transport.destroy = function (options) {
        return service.delete(options.data.models).then(function (data) {
          options.success({
            list: data
          });
        }, function (error) {
          options.error(error);
        });
      };
      transport.create = function (options) {
        return service.create(options.data.models).then(function (data) {
          options.success({
            list: data
          });
        }, function (error) {
          options.error(error);
        });
      };
      transport.parameterMap = function (options, operation) {
        if (operation !== "read" && options.models) {
          return {
            models: kendo.stringify(options.models)
          };
        }
      };
      return transport;
    }

    this.getSchema = function () {
      var schema = {
        data: function (data) {
          return data['list'];
        },
        total: function (data) {
          return data['total'];
        }
      };
      schema.model = {
        id: "id"
      }
      return schema;
    }

    /**
     * 网格可编辑
     * @return { Object } 返回条件对象
     */
    this.getEditable = function () {
      var editable = {
        confirmation: translate('kendo.editable.confirmation'), // Boolean |String |Function (default: true) true：点击删除时弹出确认框，String：确认框信息
        createAt: 'top', // String (default: "top") 插入新的数据项的位置："top" or "bottom"
        destroy: true // Boolean (default: true) 点击 "destroy" command 按钮时从 grid 中删除
        // mode: "popup", // String (default: "incell") 编辑模式："incell"、"inline"、"popup"
        // window: {
        //   title: "My Custom Title",
        //   animation: false
        // }
      };
      return editable;
    }

    /**
     * 过滤器选项
     * @return { Object } 返回条件对象
     */
    this.getFilterable = function () {
      var filterable = {
        extra: false, // Boolean (default: true) 过滤器菜单允许用户输入第二个标准
        messages: {
          info: translate('kendo.filterable.info'),
          clear: translate('kendo.filterable.clear'),
          filter: translate('kendo.filterable.filter'),
          and: translate('kendo.filterable.and'),
          or: translate('kendo.filterable.or'),
          search: translate('kendo.filterable.search'),
          selectValue: translate('kendo.filterable.selectValue'),
          selectedItemsFormat: translate('kendo.filterable.selectedItemsFormat'),
          checkAll: translate('kendo.filterable.checkAll'),
          isTrue: translate('kendo.filterable.isFalse'),
          isFalse: translate('kendo.filterable.isTrue')
        },
        operators: {
          // "字符串"类型列的过滤器菜单
          string: {
            eq: translate('kendo.filterable.eq'),
            neq: translate('kendo.filterable.neq'),
            startswith: translate('kendo.filterable.startswith'),
            contains: translate('kendo.filterable.contains'),
            endswith: translate('kendo.filterable.endswith'),
            isNull: translate('kendo.filterable.isNull'),
            isNotNull: translate('kendo.filterable.isNotNull'),
            isEmpty: translate('kendo.filterable.isEmpty'),
            isNotEmpty: translate('kendo.filterable.isNotEmpty'),
            doesnotcontain: translate('kendo.filterable.doesnotcontain')
          },
          // "数字"类型列的过滤器菜单
          number: {
            eq: translate('kendo.filterable.eq'),
            neq: translate('kendo.filterable.neq'),
            gte: translate('kendo.filterable.gte'),
            gt: translate('kendo.filterable.gt'),
            lte: translate('kendo.filterable.lte'),
            lt: translate('kendo.filterable.lt')
          },
          // "日期"类型列的过滤器菜单
          date: {
            eq: translate('kendo.filterable.eq'),
            neq: translate('kendo.filterable.neq'),
            gte: translate('kendo.filterable.gte'),
            gt: translate('kendo.filterable.gt'),
            lte: translate('kendo.filterable.lte'),
            lt: translate('kendo.filterable.lt')
          },
          // 用于外键的过滤器菜单
          enums: {
            eq: translate('kendo.filterable.eq'),
            neq: translate('kendo.filterable.neq'),
            isNull: translate('kendo.filterable.isNull'),
            isNotNull: translate('kendo.filterable.isNotNull')
          }
        },
        mode: "menu" // 'row'、'menu'、'menu, row'
      };
      return filterable;
    }

    /**
     * 启用分组
     * @return { Boolean |Object }  返回条件对象
     */
    this.getGroupable = function () {
      var groupable = {
        enabled: true,
        showFooter: true, // 显示页脚信息
        messages: {
          empty: translate('kendo.groupable.empty')
        }
      };
      return groupable;
    }

    /**
     * 常用信息
     * @return { Object } 返回条件对象
     */
    this.getMessages = function () {
      var messages = {
        commands: {
          cancel: "Cancel changes",
          canceledit: "Cancel",
          create: "Add new record",
          destroy: "Delete",
          edit: "Edit",
          save: "Save changes",
          select: "Select",
          update: "Update"
        }/*,
         noRecords: translate('kendo.messages.noRecords')*/
      };
      return messages;
    }

    /**
     * 分页信息
     * @return { Object } 返回条件对象
     */
    this.getPageable = function () {
      var pageable = {
        pageSize: 10, // 当前页显示数目
        previousNext: true, // 显示第一，最后一页的按钮
        numeric: false,  // 显示数字页数
        buttonCount: 1, // 页数按钮数目
        input: true, // 输入页数
        pageSizes: [5, 10, 20],  // Boolean |Array (default: false) 当前页显示可选数目
        refresh: false, // 刷新按钮
        info: true, // 右侧信息显示
        messages: {
          display: translate('kendo.pageable.display'),
          empty: translate('kendo.pageable.empty'),
          page: "Page",
          of: "of {0}",
          itemsPerPage: translate('kendo.pageable.itemsPerPage'),
          first: translate('kendo.pageable.first'),
          last: translate('kendo.pageable.last'),
          next: translate('kendo.pageable.next'),
          previous: translate('kendo.pageable.previous'),
          refresh: translate('kendo.pageable.refresh'),
          morePages: translate('kendo.pageable.morePages')
        }
      };
      return pageable;
    }

    /**
     * 排序
     * @return { Object } 返回条件对象
     */
    this.getSortable = function () {
      var sortable = {
        allowUnsort: true,
        mode: 'multiple' // String (default: "single") 'single'、'multiple'
      };
      return sortable;
    }

    this.getMainGridOptions = function () {

      mainGridOptions.columns = []; // Array 列配置
      mainGridOptions.dataSource = kendoService.getDataSource(); // Object |Array |kendo.data.DataSource 
      mainGridOptions.editable = kendoService.getEditable(); // Boolean |Object (default: false) 网格编辑
      mainGridOptions.filterable = false; // Boolean |Object (default: false) 过滤器
      mainGridOptions.groupable = false; // Boolean |Object (default: false)
      mainGridOptions.messages = kendoService.getMessages(); // Object 页面显示的文本信息
      mainGridOptions.navigatable = true; // Boolean (default: false) 使用键盘导航
      // mainGridOptions.noRecords = true; // Boolean |Object (default: false) 显示“没有可用的记录”
      mainGridOptions.noRecords = {
        template: translate('kendo.messages.noRecords')
      };
      mainGridOptions.pageable = kendoService.getPageable();
      mainGridOptions.reorderable = false; // Boolean (default:false) 可拖拽
      mainGridOptions.resizable = false; // Boolean (default:false) 可调节宽度
      mainGridOptions.scrollable = true; // Boolean |Object (default: true)
      mainGridOptions.selectable = false; // Boolean |String (default: false) 'row'、'cell'、'multiple, row'、'multiple, cell'
      mainGridOptions.sortable = kendoService.getSortable(); // Boolean |Object (default: false)

      // mainGridOptions.allowCopy = kendoService.getAllowCopy(); // Boolean |Object (default: false) 启用网格复制
      // mainGridOptions.altRowTemplate = ""; // String |Function 行模板
      // mainGridOptions.autoBind = true; // Boolean (default: true) 自动数据绑定，默认从dataSource中绑定
      // mainGridOptions.columnMenu = kendoService.getColumnMenu(); // Boolean |Object (default: false) 显示列按钮
      // mainGridOptions.detailTemplate = ""; // String |Function 行数据细节模板
      // mainGridOptions.height = 550; // Number |String grid 高度
      // mainGridOptions.rowTemplate = ""; // String |Function 呈现的模板行

      return angular.copy(mainGridOptions);
    }

    return this;
  }

})();
