package com.example.ems_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@SpringBootApplication
public class EmsBackendApplication {

	public static void main(String[] args) throws NoSuchAlgorithmException {
		SpringApplication.run(EmsBackendApplication.class, args);

	}

}
