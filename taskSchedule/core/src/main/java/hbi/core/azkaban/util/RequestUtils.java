package hbi.core.azkaban.util;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.request.GetRequest;

/**
 * Created by liuneng on 16-8-30.
 */

/**
 * Supports http request method.
 */
public class RequestUtils {
    private static String host;
    private static final String urlSeperator = "/";

    public static GetRequest get(String uri) {
        return Unirest.get(host+urlSeperator+uri);
    }
}
