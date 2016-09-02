package hbi.core.azkaban.mapper;

import hbi.core.azkaban.dto.Flow;
import org.apache.ibatis.annotations.Param;

/**
 * Created by liuneng on 16-9-1.
 */
public interface FlowMapper {
    Flow get(@Param("projectId") int projectId, @Param("version") int version, @Param("flowId") String flowId);

    int update(Flow flow);

    int insert(Flow flow);
}
