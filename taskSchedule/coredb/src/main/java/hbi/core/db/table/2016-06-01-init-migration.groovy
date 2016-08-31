package hbi.core.db.table


import hap.core.support.liquibase.MigrationHelper

def mhi = MigrationHelper.getInstance()

databaseChangeLog(logicalFilePath:"hbi/core/mysql/2016-06-01-init-migration.groovy"){


    changeSet(author: "yourname", id: "20160601-hailor-1") {

        if(mhi.isDbType('oracle')){
            createSequence(sequenceName: 'demo_menu_seq')
        }
        createTable(tableName: "demo_menu") {
            column(autoIncrement: "true", name: "id", type: "BIGINT") {
                constraints(nullable: "false", primaryKey: "true")
            }

            column(name: "parent_id", type: "BIGINT") {
            }

            column(name: "created_at", type: "DATETIME")

            column(name: "updated_at", type: "DATETIME")

            column(name: "created_by", type: "BIGINT")

            column(name: "updated_by", type: "BIGINT")

            column(name: "version", type: "BIGINT")

        }

        if(mhi.isDbType('oracle')){
            createSequence(sequenceName: 'demo_menu_tl_seq')
        }
        createTable(tableName: "demo_menu_tl") {
            column(autoIncrement: "true", name: "id", type: "BIGINT") {
                constraints(nullable: "false", primaryKey: "true")
            }

            column(name: "menu_id", type: "BIGINT") {
                constraints(nullable: "false")
            }

            column(name: "lang", type: "VARCHAR(15)") {
                constraints(nullable: "false")
            }

            column(name: "name", type: "VARCHAR(30)") {
                constraints(nullable: "false")
            }

            column(name: "description", type: "VARCHAR(240)") {
            }

        }

        createView(schemaName: '', viewName: 'demo_menu_vl', replaceIfExists: true) {
            "SELECT base.*,tl.name,tl.description,tl.id lang_id,tl.lang FROM demo_menu base,demo_menu_tl tl WHERE tl.menu_id=base.id"
        }

    }
}
