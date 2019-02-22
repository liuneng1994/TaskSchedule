package hbi.core.azkaban.mapper;

import hbi.core.azkaban.entity.record.DBExecutionFlow;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 */
public interface ExecutionFlowMapper {
    public DBExecutionFlow get(@Param("execId") String execId);
    public List<DBExecutionFlow> getAll();
}
