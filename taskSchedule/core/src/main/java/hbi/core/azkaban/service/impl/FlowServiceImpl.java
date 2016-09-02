package hbi.core.azkaban.service.impl;

import hbi.core.azkaban.dto.Flow;
import hbi.core.azkaban.entity.flow.DBFlow;
import hbi.core.azkaban.mapper.FlowMapper;
import hbi.core.azkaban.service.FlowService;
import org.json.JSONObject;

/**
 * Created by liuneng on 16-9-1.
 */
public class FlowServiceImpl implements FlowService {
    private FlowMapper flowMapper;

    @Override
    public int createFlow(DBFlow flow) {
        Flow flowDto = new Flow();
        flowDto.setFlowId(flow.getFlowId())
                .setProjectId(flow.getProjectId())
                .setModifiedTime(System.currentTimeMillis())
                .setVersion(flow.getVersion())
                .setJson(flow.toJSON());
        int result = flowMapper.insert(flowDto);
        return result;
    }

    @Override
    public int updateFlow(DBFlow flow) {
        Flow flowDto = new Flow();
        flowDto.setFlowId(flow.getFlowId())
                .setProjectId(flow.getProjectId())
                .setModifiedTime(System.currentTimeMillis())
                .setVersion(flow.getVersion())
                .setJson(flow.toJSON());
        return flowMapper.update(flowDto);
    }

    @Override
    public DBFlow getFlowByProjectIdAndVersionAndFlowId(int projectId, int version, String flowId) {
        Flow flow = flowMapper.get(projectId, version, flowId);
        return new DBFlow(new JSONObject(flow.getJson()));
    }
}
