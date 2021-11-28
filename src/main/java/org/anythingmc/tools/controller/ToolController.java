package org.anythingmc.tools.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ToolController {

    @GetMapping("/")
    public String tools() {
        return "hosts";
    }
}
