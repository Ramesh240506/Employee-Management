package com.example.ems_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    @Column(nullable = false,unique = true)
    private String email;

    private String imageName;
    private String imageType;

    @Lob
    private byte[] imageData;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
