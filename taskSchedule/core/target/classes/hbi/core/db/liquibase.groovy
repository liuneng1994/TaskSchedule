//package hbi.core.db

import hap.core.support.liquibase.MigrationHelper

//表结构
databaseChangeLog(logicalFilePath: "hbi/core/db/liquibase.groovy") {
    def migrationHelper = MigrationHelper.getInstance()
    migrationHelper.dbmigrate.delegate = delegate
    migrationHelper.dbmigrate("mysql",["hap/core","hbi/core"] ,["table", "data"])

}
