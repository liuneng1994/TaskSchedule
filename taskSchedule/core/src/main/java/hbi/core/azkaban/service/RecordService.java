package hbi.core.azkaban.service;

import hbi.core.azkaban.entity.record.RECExecutionHistory;
import hbi.core.azkaban.entity.record.RECExecutionSince;

import java.util.Date;
import java.util.List;

/**
 *
 */
public interface RecordService {
    public List<String> fetchExecutionJobLogs(String execId, String jobId, int offset, int length);

    /**
     * 获取一次执行流中所有的job
     */
    public RECExecutionHistory fetchFlowExecution(String execId);

    /**
     * 获取自某个时刻之后被执行的job的信息
     */
    public RECExecutionSince fetchFlowExecInfoSince(String execId, Date date);

    /**
     *  获取自某个时刻之后被执行的job的信息
     * @param lastUpdateTime 距离1976年的毫秒数
     */
    public RECExecutionSince fetchFlowExecInfoSince(String execId, long lastUpdateTime);

}
