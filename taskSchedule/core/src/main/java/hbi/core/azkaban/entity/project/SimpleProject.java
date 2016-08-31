package hbi.core.azkaban.entity.project;

import java.util.Date;

/**
 * Created by liuneng on 16-8-30.
 */
public class SimpleProject {
    private String projectId;
    private String projectName;
    private Date createdTime;

    public String getProjectId() {
        return projectId;
    }

    public SimpleProject setProjectId(String projectId) {
        this.projectId = projectId;
        return this;
    }

    public String getProjectName() {
        return projectName;
    }

    public SimpleProject setProjectName(String projectName) {
        this.projectName = projectName;
        return this;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public SimpleProject setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
        return this;
    }
}
