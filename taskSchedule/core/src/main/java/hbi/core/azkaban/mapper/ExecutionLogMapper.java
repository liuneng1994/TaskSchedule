package hbi.core.azkaban.mapper;

import hbi.core.azkaban.entity.record.DBExecutionLog;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by yyz on 2016/9/3.
 * yazheng.yang@hand-china.com
 */
public interface ExecutionLogMapper {
    public DBExecutionLog get(@Param("execId") String execId);
    public List<DBExecutionLog> getAll();
}
