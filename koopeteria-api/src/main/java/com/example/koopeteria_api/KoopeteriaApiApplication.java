package com.example.koopeteria_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*")
public class KoopeteriaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(KoopeteriaApiApplication.class, args);
	}

}
