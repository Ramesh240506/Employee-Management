package com.example.ems_backend.repository;

import com.example.ems_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {

    @Query("select e from Employee e where "+
            "lower(e.firstName) like lower(concat('%', :keyword, '%')) or "
    + "lower(e.lastName) like lower(concat('%', :keyword, '%')) or " +
            "lower(e.email) like lower(concat('%', :keyword, '%')) "
            )
    List<Employee> searchResults(String keyword);


    List<Employee> findAllByUserId(Long id);
}
