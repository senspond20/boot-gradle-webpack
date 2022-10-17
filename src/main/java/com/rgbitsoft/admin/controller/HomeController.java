package com.rgbitsoft.admin.controller;

import com.rgbitsoft.admin.service.VueSsrGetMapping;
import com.rgbitsoft.admin.service.VueSsrRenderService;
import com.rgbitsoft.admin.utils.WebClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;


import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor
@Slf4j
public class HomeController {

    private final VueSsrRenderService vueSsrRenderService;

    @VueSsrGetMapping
    public String route(Model model,  HttpServletRequest request){
        final String path = request.getServletPath();
        final String html = vueSsrRenderService.renderPage(path);
        log.info(String.format("SSR Route:%s\t\tIP:%s", path, WebClient.getIp(request)));
        model.addAttribute("rendered", html);
        model.addAttribute("user", "senshig");
        return "index";
    }
}
