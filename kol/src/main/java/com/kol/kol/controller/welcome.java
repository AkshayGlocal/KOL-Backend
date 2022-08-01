package com.kol.kol.controller;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@ComponentScan
@RestController

public class welcome {
    @GetMapping("hi")
    public String helloworld(){
        return "<h2>Heello</h2>";
    }
}
