package hbi.core.azkaban.service.impl;

import hbi.core.azkaban.entity.theme.Theme;
import hbi.core.azkaban.mapper.ThemeMapper;
import hbi.core.azkaban.service.ProjectService;
import hbi.core.azkaban.service.ThemeService;
import org.apache.log4j.Logger;

/**
 */
public class ThemeServiceImpl implements ThemeService {
    private ThemeMapper themeMapper;
    private Logger logger = Logger.getLogger(ThemeServiceImpl.class);
    @Override
    public boolean create(String themeName, String description, String projectName, String projectDescription) {

        //插入projects表判断是否成功
        ProjectService projectService = new ProjectServiceImpl();
        boolean isSuccess = projectService.createProject(projectName,description);
        if(!isSuccess){
            logger.info("插入theme过程中，project信息录入失败");
            return false;
        }
        //插入theme基本表
        try {
            this.insertTheme(themeName,description,projectName);
        } catch (Exception e) {
            isSuccess = false;
            logger.error("插入theme失败",e);
            return false;
        }
        return isSuccess;
    }
    private boolean insertTheme(String themeName, String description, String projectName) throws Exception {
        boolean isSuccess = true;
        Theme theme = new Theme();
        theme.setDescription(description);
        theme.setThemeName(themeName);
        theme.setProjectName(projectName);
        theme.setProjectVersion(1);
        themeMapper.save(theme);
        return isSuccess;
    }
}
