import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getEmployeeById } from '../services/EmployeeService';
import { useParams } from 'react-router-dom';

const ViewComp = () => {

    const[employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });
    const {id} = useParams();

    useEffect(() => {
        fetchEmployeeDetails();
    }, []);


    const fetchEmployeeDetails = async () =>{
        
        const respone= await getEmployeeById(id);
        setEmployee(respone.data);
        console.log("Employee details fetched:", respone.data);
    }
  return (
    <div>
        <h2>View Employee Details</h2>
        <div className="card">
            <div className="card-body">
            <p><strong>First Name:</strong> {employee.firstName}</p>
            <p><strong>Last Name:</strong> {employee.lastName}</p>
            <p><strong>Email:</strong>{employee.email}</p>
            </div>
        </div>
    </div>
  )
}

export default ViewComp
