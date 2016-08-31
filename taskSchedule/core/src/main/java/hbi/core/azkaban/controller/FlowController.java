package hbi.core.azkaban.controller;

import hbi.core.Parameters.flow.FlowObj;
import hbi.core.azkaban.service.FlowService;
import hbi.core.azkaban.util.ResultObj;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;

/**
 * Created by 邓志龙 on 2016/8/31.
 */
@Controller
public class FlowController {
    @Autowired
    FlowService service;
    /**
     * 取消调度流
     * @param projectName
     * @return
     */
   @ResponseBody
    public Object fetchFlows(@PathVariable("projectName") String projectName){
       System.out.println(service.Fetchflows(projectName));
        return  service.Fetchflows(projectName);
    }
}
