package hbi.core.azkaban.util;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.request.GetRequest;
import com.mashape.unirest.request.HttpRequestWithBody;

/**
 * Created by liuneng on 16-8-30.
 */

/**
 * Supports http request method.
 */
public class RequestUtils {
    private static final String host="http://172.20.0.28:12320";
    private static final String urlSeperator = "/";

    public static GetRequest get(String uri) {
        return Unirest.get(host+urlSeperator+uri);
    }
    public static HttpRequestWithBody post(String uri) {
        return Unirest.post(host+urlSeperator+uri);
    }

}
