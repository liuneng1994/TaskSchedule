package hbi.core.azkaban.controller;

import hbi.core.azkaban.flow.FlowObj;
import hbi.core.azkaban.service.ScheduleFlowService;
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
public class ScheduleFlowController {
    @Autowired
    ScheduleFlowService service;

    /**
     * 设置调度流
     * @return
     */
   @ResponseBody
    public ResultObj scheduleFlow(){
       SimpleDateFormat sdf=new SimpleDateFormat("MM/dd/yyyy");
       FlowObj obj=new FlowObj("myTest",2L,"command","12,00,pm,PDT","09/22/2016");
       obj.setIs_recurring();
       obj.setPeriod("M");
       obj.setPeriodVal(1);
       ResultObj result= service.scheduleFlow(obj);
       return result;
   }

    /**
     * 取消调度流
     * @param id
     * @return
     */
    @ResponseBody
    public ResultObj unscheduleFlow(@PathVariable("id") Long id){
        ResultObj result= service.unscheduleFlow(id);
        return result;
    }
}
