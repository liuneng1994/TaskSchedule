package hbi.core.azkaban.service;

import hbi.core.azkaban.entity.record.RECExecutionHistory;
import hbi.core.azkaban.entity.record.RECExecutionSince;

import java.util.Date;
import java.util.List;

/**
 * Created by yyz on 2016/9/1.
 * yazheng.yang@hand-china.com
 *
 */
public interface RecordService {
    public void fetchAllProjectHistory();
    public List<String> fetchExecutionJobLogs(String sessionId, String execId, String jobId, int offset, int length);

    /**
     * 获取一次执行流中所有的job
     */
    public RECExecutionHistory fetchFlowExecution(String sessionId, String execId);

    /**
     * 获取自某个时刻之后被更新的job的信息
     */
    public RECExecutionSince fetchFlowExecInfoSince(String sessionId, String execId, Date date);

    /**
     *  获取自某个时刻之后被更新的job的信息
     * @param lastUpdateTime 距离1976年的毫秒数
     */
    public RECExecutionSince fetchFlowExecInfoSince(String sessionId, String execId, long lastUpdateTime);

    /**
     * 获取流信息
     */

    public void fetchFlowInfo(String sessionId,String flowId);
}
