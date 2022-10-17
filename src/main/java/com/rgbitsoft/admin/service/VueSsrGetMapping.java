package com.rgbitsoft.admin.service;

import org.springframework.core.annotation.AliasFor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@RequestMapping(method = RequestMethod.GET)
public @interface VueSsrGetMapping {
    @AliasFor(annotation = RequestMapping.class)
    String[] value() default {
            "/",
            "/blog"
    };
}
