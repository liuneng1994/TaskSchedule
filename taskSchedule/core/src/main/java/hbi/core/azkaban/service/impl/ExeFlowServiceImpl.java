package hbi.core.azkaban.service.impl;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.exceptions.UnirestException;
import hbi.core.azkaban.entity.flow.ExeFlow;
import hbi.core.azkaban.flow.FlowObj;
import hbi.core.azkaban.service.ExeFlowService;
import hbi.core.azkaban.util.RequestUrl;
import hbi.core.azkaban.util.RequestUtils;
import org.apache.log4j.Logger;

import java.util.Map;

/**
 * Created by 邓志龙 on 2016/8/31.
 */
public class ExeFlowServiceImpl implements ExeFlowService {
    private static Logger logger = Logger.getLogger(ExeFlowService.class);
    private HttpResponse<JsonNode> response;
    @Override
    public Object Fetchflows(String projectName) {
        try {
            response= RequestUtils.get(RequestUrl.MANAGER)
                    .queryString("ajax","fetchprojectflows")
                    .queryString("project",projectName)
                    .asJson();

        } catch (UnirestException e) {
            logger.error("工程名错误！");
            throw new IllegalArgumentException("工程名错误！", e);
        }
        return response.getBody().getObject();
    }

    @Override
    public Object FetchExeFlows(String projectName, String flowId, Integer start, Integer length) {
        try {
            response= RequestUtils.get(RequestUrl.MANAGER)
                    .queryString("ajax","fetchFlowExecutions")
                    .queryString("project",projectName)
                    .queryString("flow",flowId)
                    .queryString("start",start)
                    .queryString("length",length)
                    .asJson();

        } catch (UnirestException e) {
            logger.error("无法查询此项目或流");
            throw new IllegalArgumentException("无法查询此项目或流", e);
        }
        return response.getBody().getObject();
    }

    @Override
    public Object ExecuteFlow(FlowObj obj) {
        try {
            response= RequestUtils.get(RequestUrl.EXECUTOR)
                    .queryString("ajax","executeFlow")
                    .queryString("project",obj.getProjectName())
                    .queryString("flow",obj.getFlowName())
                    .queryString("disabled",obj.getDisabled())
                    .queryString("successEmails",obj.getSuccessEmails())
                    .queryString("failureEmails",obj.getFailureEmails())
                    .queryString("successEmailsOverride",obj.isSuccessOverride())
                    .queryString("failureEmailsOverride",obj.isFailOverride())
                    .queryString("notifyFailUreFirst",obj.isNotifyFailFirst())
                    .queryString("notifyFailureLast",obj.isNotifyFailLast())
                    .queryString("failureAction",obj.getFailAction())
                    .queryString("concurrentOption",obj.getConcurrentOption())
                    .asJson();

        } catch (UnirestException e) {
            logger.error("流已经运行！");
            throw new IllegalArgumentException("流已经运行！", e);
        }

        return response.getBody().getObject();
    }

    @Override
    public ExeFlow FetchJobs(Map<String, Object> map) {
        try {
            response= RequestUtils.get(RequestUrl.MANAGER)
                    .queryString("ajax","fetchflowgraph")
                    .queryString(map)
                    .asJson();

        } catch (UnirestException e) {
            logger.error("无法找到流！");
            throw new IllegalArgumentException("无法找到流！", e);
        }
        System.out.println("-------------------------");
        System.out.println(response.getBody().getObject());
        return new ExeFlow(response.getBody().getObject());
    }

    @Override
    public ExeFlow FetchRunningFlow(Map<String, Object> map) {
        try {
            response= RequestUtils.get(RequestUrl.EXECUTOR)
                    .queryString("ajax","getRunning")
                    .queryString(map)
                    .asJson();

        } catch (UnirestException e) {
            logger.error("流不在运行中！");
            throw new IllegalArgumentException("流不在运行中！", e);
        }
        return new ExeFlow(response.getBody().getObject());
    }

    @Override
    public ExeFlow CancelFlow(Map<String, Object> map) {
        try {
            response= RequestUtils.get(RequestUrl.EXECUTOR)
                    .queryString("ajax","cancelFlow")
                    .queryString(map)
                    .asJson();

        } catch (UnirestException e) {
            logger.error("流不在运行中！");
            throw new IllegalArgumentException("流不在运行中！", e);
        }

        return new ExeFlow(response.getBody().getObject());
    }

    @Override
    public ExeFlow PauseFlow(Map<String, Object> map) {
        try {
            response= RequestUtils.get(RequestUrl.EXECUTOR)
                    .queryString("ajax","pauseFlow")
                    .queryString(map)
                    .asJson();

        } catch (UnirestException e) {
            logger.error("流不在运行中！");
            throw new IllegalArgumentException("流不在运行中！", e);
        }

        return new ExeFlow(response.getBody().getObject());
    }

    @Override
    public ExeFlow ResumeFlow(Map<String, Object> map) {
        try {
            response= RequestUtils.get(RequestUrl.EXECUTOR)
                    .queryString("ajax","resumeFlow")
                    .queryString(map)
                    .asJson();

        } catch (UnirestException e) {
            logger.error("流不在运行中！");
            throw new IllegalArgumentException("流不在运行中！", e);
        }

        return new ExeFlow(response.getBody().getObject());
    }

}

