package hbi.core.azkaban.service;

import hbi.core.azkaban.entity.project.SimpleProject;

import java.util.List;

/**
 * Created by 刘能 on 2016/8/31.
 */
public interface ProjectService {
    public boolean createProject(String projectName, String description);

    public List<SimpleProject> getAllProjects();

    public boolean deleteProject(String projectName);
}
