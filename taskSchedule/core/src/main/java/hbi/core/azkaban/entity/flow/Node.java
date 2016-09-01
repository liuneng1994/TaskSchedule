package hbi.core.azkaban.entity.flow;

import java.awt.geom.Point2D;

/**
 * Created by liuneng on 16-8-30.
 */
public class Node {
    private String id;
    private String jobSource;
    private String propsSource;

    private Point2D position = null;
    private int level;
    private int expectedRunTimeSec = 1;
    private String type;

    private String embeddedFlowId;
}
