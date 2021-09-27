package com.demo.blog.cucumber;

import com.demo.blog.BlogApp;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@SpringBootTest(classes = BlogApp.class)
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
