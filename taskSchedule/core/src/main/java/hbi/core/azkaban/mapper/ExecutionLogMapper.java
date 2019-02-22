package hbi.core.azkaban.mapper;

import hbi.core.azkaban.entity.record.DBExecutionLog;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 */
public interface ExecutionLogMapper {
    public DBExecutionLog get(@Param("execId") String execId);
    public List<DBExecutionLog> getAll();
}
