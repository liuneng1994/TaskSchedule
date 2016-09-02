package hbi.core.azkaban.service;

import hbi.core.azkaban.entity.flow.DBFlow;

/**
 * Created by liuneng on 16-9-1.
 */
public interface FlowService {
    int createFlow(DBFlow flow);

    int updateFlow(DBFlow flow);

    DBFlow getFlowByProjectIdAndVersionAndFlowId(int projectId, int version, String flowId);
}
