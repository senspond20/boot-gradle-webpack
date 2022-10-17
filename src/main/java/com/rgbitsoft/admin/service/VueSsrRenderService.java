package com.rgbitsoft.admin.service;

import com.rgbitsoft.admin.utils.VueSsrRenderer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VueSsrRenderService {

    private final VueSsrRenderer renderer;


    public String renderPage(String route) {
        String html = "";
        try {
            html = renderer.render(route);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return html;
    }
}
