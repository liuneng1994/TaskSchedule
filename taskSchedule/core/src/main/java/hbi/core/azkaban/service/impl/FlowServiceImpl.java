package hbi.core.azkaban.service.impl;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.exceptions.UnirestException;
import hbi.core.azkaban.service.FlowService;
import hbi.core.azkaban.util.RequestUrl;
import hbi.core.azkaban.util.RequestUtils;
import org.apache.log4j.Logger;

/**
 * Created by 邓志龙 on 2016/8/31.
 */
public class FlowServiceImpl implements FlowService {
    private static Logger logger = Logger.getLogger(FlowService.class);
    private HttpResponse<JsonNode> response;

    @Override
    public Object Fetchflows(String projectName) {
        try {
            response = RequestUtils.get(RequestUrl.MANAGER)
                    .queryString("ajax", "fetchprojectflows")
                    .queryString("project", projectName)
                    .asJson();

        } catch (UnirestException e) {
            logger.error("网络错误，请重试！");
            throw new IllegalArgumentException("网络错误，请重试！", e);
        }
        return response.getBody().getObject();
    }

}

