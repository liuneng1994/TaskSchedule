package hbi.core.azkaban.service;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;

/**
 * Created by 邓志龙 on 2016/8/31.
 */
public interface FlowService {
    Object Fetchflows(String projectName);
}
