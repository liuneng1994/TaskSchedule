package hbi.core.azkaban.service.impl;

import hbi.core.azkaban.dto.Job;
import hbi.core.azkaban.entity.job.DBJob;
import hbi.core.azkaban.entity.job.JobDetail;
import hbi.core.azkaban.mapper.JobMapper;
import hbi.core.azkaban.service.JobService;
import org.json.JSONObject;

/**
 * Created by 刘能 on 2016/9/2.
 */
public class JobServiceImpl implements JobService {
    private JobMapper jobMapper;

    @Override
    public int createJob(JobDetail jobDetail) {
        Job jobDto = new Job().setProjectId(jobDetail.getProjectId())
                .setJobName(jobDetail.getJobName())
                .setModifiedTime(System.currentTimeMillis())
                .setVersion(jobDetail.getVersion())
                .setProperty(jobDetail.getJob().toJSON());
        return jobMapper.insert(jobDto);
    }

    @Override
    public JobDetail getJob(int projectId, int version, String JobName) {
        Job job = jobMapper.get(projectId, version, JobName);
        JobDetail jobDetail = new JobDetail();
        jobDetail.setVersion(job.getVersion())
                .setProjectId(job.getProjectId())
                .setJob(new DBJob(new JSONObject(job.getProperty())))
                .setJobName(job.getJobName())
                .setModifiedTime(job.getModifiedTime());
        return jobDetail;
    }

    @Override
    public int updateJob(JobDetail jobDetail) {
        Job job = new Job();
        job.setModifiedTime(System.currentTimeMillis())
                .setJobName(jobDetail.getJobName())
                .setProjectId(jobDetail.getProjectId())
                .setVersion(jobDetail.getVersion())
                .setProperty(jobDetail.getJob().toJSON());
        return jobMapper.update(job);
    }
}
