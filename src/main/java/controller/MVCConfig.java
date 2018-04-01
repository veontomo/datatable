package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MVCConfig extends WebMvcConfigurerAdapter {
    @Autowired
    private Intersceptor interceptor;

    private final String pattern = "/**/consumer/**/";

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        System.out.println("interceptor " + pattern + " is added...");
        registry.addInterceptor(interceptor).addPathPatterns(pattern);
    }
}
