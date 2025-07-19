package com.example.ems_backend.controller;

import com.example.ems_backend.entity.Employee;
import com.example.ems_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    EmployeeService service;

    @GetMapping("/checking")
    public String check() {
        return "Auth success..!";
    }

    @GetMapping
    public List<Employee> fetchEmpData() {
        return service.fetchEmpRecords();
    }

    @GetMapping("{id}")
    public Employee fetchEmpById(@PathVariable Long id) {
        return service.fetchEmpRecordsById(id);
    }

    @PostMapping
    public void insertEmpData(@RequestPart("employee") Employee employee,
                              @RequestPart("profileImage") MultipartFile imageFile) throws IOException {
        service.insertEmpRecords(employee, imageFile);
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> fetchImg(@PathVariable Long id) {
        Employee employee = service.fetchEmpRecordsById(id);

        byte[] imageFile = employee.getImageData();

        return ResponseEntity.ok().body(imageFile);
    }

    @PutMapping("{id}")
    public Employee updateEmpData(@PathVariable Long id,
                                  @RequestPart("employee") Employee employee,
                                  @RequestPart(value = "profileImage", required = false) MultipartFile imageFile) throws IOException {
        return service.updateEmpRecords(id, employee, imageFile);
    }

    @DeleteMapping("{id}")
    public void deleteEmpData(@PathVariable Long id) {
        service.deleteEmpRecords(id);
    }

    @GetMapping("/employee/search")
    public List<Employee> searchResults(@RequestParam String keyword) {
        return service.searchResults(keyword);
    }

    @GetMapping("/employee/sort")
    public List<Employee> sortResults(@RequestParam String sortBy) {
        return service.sortEmpResults(sortBy);
    }
}
