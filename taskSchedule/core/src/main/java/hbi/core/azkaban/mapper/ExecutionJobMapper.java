package hbi.core.azkaban.mapper;

import hbi.core.azkaban.entity.record.DBExecutionJob;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by yyz on 2016/9/3.
 * yazheng.yang@hand-china.com
 */
public interface ExecutionJobMapper {
    public DBExecutionJob get(@Param("execId") String execId,@Param("jobId") String jobId,@Param("attempt") long attempt);
    public List<DBExecutionJob> getAll();
    public List<DBExecutionJob> getAllInExec(@Param("execId") String execId);
}
