package controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Component
public class Intersceptor extends HandlerInterceptorAdapter {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        System.out.println("preHandle: new " + request.getMethod() + " request");
        System.out.println("content type: " + request.getContentType());
        System.out.println("query string: " + request.getQueryString());
        System.out.println("parameter names: " + request.getParameterNames());
        
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
            Exception ex) {
        System.out.println("afterCompletion: new request");
    }
}
