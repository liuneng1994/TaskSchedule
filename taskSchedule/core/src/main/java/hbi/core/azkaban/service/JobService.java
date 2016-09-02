package hbi.core.azkaban.service;

import hbi.core.azkaban.entity.job.DBJob;

/**
 * Created by 刘能 on 2016/9/2.
 */
public interface JobService {
    int createJob(int projectId, int version, String jobName, DBJob job);


}
