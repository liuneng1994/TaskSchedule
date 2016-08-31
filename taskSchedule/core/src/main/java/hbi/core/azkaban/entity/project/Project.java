package hbi.core.azkaban.entity.project;

import hbi.core.azkaban.entity.flow.Flow;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;


/**
 * Created by liuneng on 16-8-30.
 */

public class Project {
    private int id;
    private String name;
    private boolean active = true;
    private String description;
    private int version = -1;
    private long createTimestamp;
    private long lastModifiedTimestamp;
    private String source;
    private Map<String, Flow> flows = null;
    private HashSet<String> proxyUsers = new HashSet<>();
    private Map<String, Object> metadata = new HashMap<>();
}
