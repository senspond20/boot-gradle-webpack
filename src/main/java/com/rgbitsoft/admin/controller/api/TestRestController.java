package com.rgbitsoft.admin.controller.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestRestController{

    @GetMapping("/word")
    public String getWord(){
        return "word";
    }
}
