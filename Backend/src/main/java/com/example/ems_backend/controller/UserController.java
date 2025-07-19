package com.example.ems_backend.controller;

import com.example.ems_backend.entity.UserEntity;
import com.example.ems_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class UserController {

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;
    @PostMapping("/register")
    public UserEntity registerUser(@RequestBody UserEntity user)
    {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public Map<String, String> loginUser(@RequestBody UserEntity user) {
        String token = userService.verifyUser(user);
        Map<String, String> response = new HashMap<>();
        response.put("accessToken", token);
        return response;
    }
}
