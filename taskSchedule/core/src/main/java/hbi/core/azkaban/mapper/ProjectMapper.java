package hbi.core.azkaban.mapper;

import org.apache.ibatis.annotations.Param;

/**
 * Created by 刘能 on 2016/9/2.
 */
public interface ProjectMapper {
    int updateActiveProjectVersion(@Param("projectName") String projectName, @Param("version") int version);
}
