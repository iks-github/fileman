package com.iksgmbh.fileman.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@ComponentScan({"com.iksgmbh.fileman.backend","com.iksgmbh.fileman.rest"})
@SpringBootApplication
public class FilemanBackend 
{
    public static void main(String[] args) {
        SpringApplication.run(FilemanBackend.class, args);
    }

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//        	@Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**").allowedOrigins("*");
//                registry.addMapping("/**").allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH");
//            }
//        	
//        };
//    }
}
