package com.example.ems_backend.service;

import com.example.ems_backend.entity.Employee;
import com.example.ems_backend.entity.UserEntity;
import com.example.ems_backend.repository.EmployeeRepository;
import com.example.ems_backend.repository.UserRepository;
import jakarta.validation.constraints.Null;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class EmployeeService {


    @Autowired
    EmployeeRepository empRepo;

    @Autowired
    UserRepository userRepository;
    public List<Employee> fetchEmpRecords(Long id) {
      return empRepo.findAllByUserId(id);

    }

    public Employee fetchEmpRecordsById(Long id) {

            return empRepo.findById(id)
                    .orElseThrow(()->new RuntimeException("Employee not found"));


    }



    public void deleteEmpRecords(Long id) {
        if(empRepo.existsById(id))
        {
        empRepo.deleteById(id);
        }
        else
        {
            throw new RuntimeException("No Id found");
        }

    }

    public void insertEmpRecords(Employee employee, MultipartFile imageFile) throws IOException {


        String username=SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity user=userRepository.findByUsername(username);
        System.out.println("Username: "+ username);
        employee.setUser(user);


        employee.setImageName(imageFile.getOriginalFilename());
            employee.setImageType(imageFile.getContentType());
            employee.setImageData(imageFile.getBytes());

            empRepo.save(employee);
    }

    public Employee updateEmpRecords(Long id, Employee employee, MultipartFile imageFile) throws IOException {

        Employee existingEmployee=empRepo.findById(id).orElseThrow(()->new RuntimeException("No data"));

        if(imageFile!= null&&!imageFile.isEmpty())
        {
        existingEmployee.setImageName(imageFile.getOriginalFilename());
        existingEmployee.setImageType(imageFile.getContentType());
        existingEmployee.setImageData(imageFile.getBytes());

        }

        existingEmployee.setFirstName(employee.getFirstName());
        existingEmployee.setLastName(employee.getLastName());
        existingEmployee.setEmail(employee.getEmail());

        return empRepo.save(existingEmployee);


    }

    public List<Employee> searchResults(String keyword) {
        return empRepo.searchResults(keyword);
    }

    public List<Employee> sortEmpResults(String sortBy) {
//        For sorting this line
        return empRepo.findAll(Sort.by(Sort.Direction.ASC,sortBy));
    }



    public Employee getEmployeeByUserId(Long id) {
        if(empRepo.existsById(id))
        return empRepo.findById(id).orElseThrow();
        return null;
    }
}
