package hbi.core.azkaban.mapper;

import hbi.core.azkaban.entity.record.DBExecutionFlow;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by yyz on 2016/9/3.
 * yazheng.yang@hand-china.com
 */
public interface ExecutionFlowMapper {
    public DBExecutionFlow get(@Param("execId") String execId);
    public List<DBExecutionFlow> getAll();
}
