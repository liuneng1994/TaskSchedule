package hbi.core.azkaban.service.impl;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.exceptions.UnirestException;
import hbi.core.Parameters.flow.FlowObj;
import hbi.core.azkaban.service.ScheduleFlowService;
import hbi.core.azkaban.util.RequestUrl;
import hbi.core.azkaban.util.RequestUtils;
import hbi.core.azkaban.util.ResultObj;
import org.apache.log4j.Logger;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by 邓志龙 on 2016/8/31.
 */
public class ScheduleFlowServiceImpl implements ScheduleFlowService {
    private static Logger logger = Logger.getLogger(ScheduleFlowService.class);
    private HttpResponse<JsonNode> response;
    /**
     * 调度一个流
     * @param flow
     * @return
     */
    @Override
    public ResultObj scheduleFlow(FlowObj flow) {
            ResultObj result=new ResultObj();
        try {
            response=RequestUtils.post(RequestUrl.SCHEDULE).field("ajax","scheduleFlow")
                    .field("session.id","34b73556-ed93-4642-abb4-d4d0408ab1c7")
                    .field("projectName",flow.getProjectName())
                    .field("projectId",flow.getProjectId())
                    .field("flow",flow.getFlowName())
                    .field("scheduleTime",flow.getScheduleTime())
                    .field("scheduleDate",flow.getScheduleDate())
                    .field("is_recurring",flow.getIs_recurring())
                    .field("period",flow.getPeriodVal()+flow.getPeriod())
                    .asJson();
            System.out.println(response.getBody().getObject().toString());
            if(response.getBody().getObject().getString("status").equals("success"))
            {
               /* if(response.getBody().getObject().toString().contains("\"error\":"))
                {
                        result.setCode(0);
                        result.setMessage("调度错误！");
                }else
                {

                }*/
                    result.setCode(1);
                    result.setMessage("执行成功");

            }else
            {
                result.setCode(0);
                result.setMessage("调度错误！");
            }
        } catch (UnirestException e) {
            result.setCode(0);
            result.setMessage("网络错误，请重试！");
           logger.error("网络错误，请重试！");
            throw new IllegalArgumentException("网络错误，请重试！", e);


        }

        return result;
    }

    @Override
    public ResultObj unscheduleFlow(Long id) {
        ResultObj result=new ResultObj();
        try {
            response=RequestUtils.post(RequestUrl.SCHEDULE).field("action","removeSched")
                    .field("session.id","f4b73716-afb4-445e-87be-09ff9ba5146d")
                    .field("scheduleId",id)
                    .asJson();
            System.out.println(response.getBody().getObject().toString());
            if(response.getBody().getObject().getString("status").equals("success"))
            {

                result.setCode(1);
                result.setMessage("执行成功");

            }else
            {
                result.setCode(0);
                result.setMessage("调度错误！");
            }
        } catch (UnirestException e) {
            result.setCode(0);
            result.setMessage("网络错误，请重试！");
            logger.error("网络错误，请重试！");
            throw new IllegalArgumentException("网络错误，请重试！", e);
        }
        return result;
    }
}

