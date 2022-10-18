package com.rgbitsoft.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model){
        model.addAttribute("msg", "senshig");
        return "index";
    }



    @GetMapping("/test")
    public String test(Model model){
        model.addAttribute("test", "hi");
        return "test";
    }

    @GetMapping("/posts")
    public String post(Model model){
        model.addAttribute("test", "hi");
        return "posts";
    }
}
