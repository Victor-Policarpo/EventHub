package com.victorpolicarpo.toyloop;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.TimeZone;

@SpringBootApplication
@EnableScheduling
public class ToyLoopRentalSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToyLoopRentalSystemApplication.class, args);
	}

	@PostConstruct
	public void init() {
		// Força a aplicação inteira a usar o fuso horário de Brasília
		TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_Paulo"));
	}
}
