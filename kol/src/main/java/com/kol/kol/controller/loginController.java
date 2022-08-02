package com.kol.kol.controller;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@ComponentScan
@Controller

public class loginController {
    @GetMapping("api")
    public String getLoginpage(){
        return "login";
    }
}
