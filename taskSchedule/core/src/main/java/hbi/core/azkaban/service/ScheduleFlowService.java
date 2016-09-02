package hbi.core.azkaban.service;

import hbi.core.azkaban.flow.FlowObj;
import hbi.core.azkaban.util.ResultObj;

/**
 * Created by 邓志龙 on 2016/8/31.
 */
public interface ScheduleFlowService {
   ResultObj scheduleFlow(FlowObj flow);
   ResultObj unscheduleFlow(Long id);
}
