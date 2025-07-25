package com.example.ems_backend.service;

import com.example.ems_backend.entity.UserEntity;
import com.example.ems_backend.repository.UserRepository;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JwtService jwtService;

    @Autowired
    UserRepository userRepository;
    public UserEntity registerUser(UserEntity user) {
        return userRepository.save(user);
    }

    public String verifyUser(UserEntity user) {
        Authentication authentication=authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
        if(authentication.isAuthenticated())
        {

            return jwtService.generateToken(user.getUsername());
        }
        return "Failed";
    }

    public UserEntity getEmployeeByUserName(String username) {
        return userRepository.findByUsername(username);
    }
}
