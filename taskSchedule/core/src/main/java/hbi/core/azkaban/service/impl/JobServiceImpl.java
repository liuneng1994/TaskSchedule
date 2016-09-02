package hbi.core.azkaban.service.impl;

import hbi.core.azkaban.dto.Job;
import hbi.core.azkaban.entity.job.DBJob;
import hbi.core.azkaban.mapper.JobMapper;
import hbi.core.azkaban.service.JobService;

/**
 * Created by 刘能 on 2016/9/2.
 */
public class JobServiceImpl implements JobService {
    private JobMapper jobMapper;

    @Override
    public int createJob(int projectId, int version, String jobName, DBJob job) {
        Job jobDto = new Job().setProjectId(projectId)
                .setJobName(jobName)
                .setModifiedTime(System.currentTimeMillis())
                .setVersion(version)
                .setProperty(job.toJSON());
        return jobMapper.insert(jobDto);
    }
}
