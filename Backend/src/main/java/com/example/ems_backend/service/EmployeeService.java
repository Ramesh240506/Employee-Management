package com.example.ems_backend.service;

import com.example.ems_backend.entity.Employee;
import com.example.ems_backend.repository.EmployeeRepository;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class EmployeeService {


    @Autowired
    EmployeeRepository empRepo;

    public List<Employee> fetchEmpRecords() {
      return empRepo.findAll();

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
}
