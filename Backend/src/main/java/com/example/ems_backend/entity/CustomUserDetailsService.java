package com.example.ems_backend.entity;

import com.example.ems_backend.repository.EmployeeRepository;
import com.example.ems_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user=userRepo.findByUsername(username);

        if(user==null){
            throw new UsernameNotFoundException("User Not Found");
        }

        return new User(user.getUsername(),user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("USER")));
    }
}
