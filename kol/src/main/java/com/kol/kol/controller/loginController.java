package com.kol.kol.controller;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
@ComponentScan
@Controller


@RequestMapping(path = "/")
public class loginController {
    @GetMapping("api")
    public String getLoginpage(){
        return "login";
    }
    @GetMapping
    public String rootget(){
        return "rootpage";
    }
}
