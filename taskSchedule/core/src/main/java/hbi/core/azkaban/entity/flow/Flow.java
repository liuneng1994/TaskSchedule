package hbi.core.azkaban.entity.flow;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by liuneng on 16-8-30.
 */
public class Flow {
    private String id;
    private int projectId;
    private String type;

    private List<Node> nodes = new ArrayList<>();
    private List<Edge> edges = new ArrayList<>();
    private List<String> props = new ArrayList<>();

    private List<String> failureEmail = new ArrayList<>();
    private List<String> successEmail = new ArrayList<>();
    private final String mailCreator = "default";
    private int version = -1;
    private Map<String, Object> metadata = new HashMap<String, Object>();

    private boolean isLayedOut = false;

    public String getId() {
        return id;
    }

    public Flow setId(String id) {
        this.id = id;
        return this;
    }

    public int getProjectId() {
        return projectId;
    }

    public Flow setProjectId(int projectId) {
        this.projectId = projectId;
        return this;
    }

    public String getType() {
        return type;
    }

    public Flow setType(String type) {
        this.type = type;
        return this;
    }

    public List<Node> getNodes() {
        return nodes;
    }

    public Flow setNodes(List<Node> nodes) {
        this.nodes = nodes;
        return this;
    }

    public List<Edge> getEdges() {
        return edges;
    }

    public Flow setEdges(List<Edge> edges) {
        this.edges = edges;
        return this;
    }

    public List<String> getProps() {
        return props;
    }

    public Flow setProps(List<String> props) {
        this.props = props;
        return this;
    }

    public List<String> getFailureEmail() {
        return failureEmail;
    }

    public Flow setFailureEmail(List<String> failureEmail) {
        this.failureEmail = failureEmail;
        return this;
    }

    public List<String> getSuccessEmail() {
        return successEmail;
    }

    public Flow setSuccessEmail(List<String> successEmail) {
        this.successEmail = successEmail;
        return this;
    }

    public String getMailCreator() {
        return mailCreator;
    }

    public int getVersion() {
        return version;
    }

    public Flow setVersion(int version) {
        this.version = version;
        return this;
    }

    public Map<String, Object> getMetadata() {
        return metadata;
    }

    public Flow setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
        return this;
    }

    public boolean isLayedOut() {
        return isLayedOut;
    }

    public Flow setLayedOut(boolean layedOut) {
        isLayedOut = layedOut;
        return this;
    }
}
