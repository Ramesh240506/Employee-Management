import React, { useEffect, useState } from 'react'
import { deleteEmployee, getEmployees, sortEmployees } from '../services/EmployeeService';
import HeaderComp from './HeaderComp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListEmployeeComp = () => {
    
    const [employees, setEmployees] = useState([]);

    const [searchResults, setSearchResults] = useState([]);

    const [sortBy, setSortBy] = useState("");


    const navigate = useNavigate();
    // Simulating fetching data from an API
        useEffect(() => {
            getAllEmployees();
    }, [sortBy]);

    const getAllEmployees = () => {
        if(sortBy) {
            sortEmployees(sortBy)
                .then(response => {
                    setEmployees(response.data);
                })
                .catch(error => {
                    console.error('Error fetching sorted employees:', error);
                });
        }
        else
        {
        getEmployees()
                .then(response => {
                    setEmployees(response.data);
                })
                .catch(error => {
                    console.error('Error fetching employees:', error);
                });
            }
    }
    const addNewEmployee = () => {
        navigate('/add-employee');
    }

    const handleUpdate = (id) => {
        navigate(`/update-employee/${id}`);
    }

    const handleDelete = (id) => {
        deleteEmployee(id).then((response) => {
            getAllEmployees(); // Refresh the list after deletion
            console.log("Employee deleted successfully", response.data);
        })
    }    

    const [hasSearched, setHasSearched] = useState(false);
    const handleSearch = async (e) => {

        if(e.target.value.length>=1)
        {
            const token = localStorage.getItem("token")
            const response= await axios.get(`http://localhost:8778/api/employee/search?keyword=${e.target.value}`
                , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            setSearchResults(response.data);
            console.log("Search Results:", response.data);
            setHasSearched(true);
        }
        else
        {
            setSearchResults([]);
            setHasSearched(false);
        }

    }

    const handleSortButton = (e) => {
        // const sortBy = e.target.value;
        setSortBy(e.target.value);
      
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div  className='container'>
        <h2 className='text-center'>List of Employees</h2>
        <nav className="navbar navbar-light bg-light mb-3">
        <a className="navbar-brand">Navbar</a>
        <form className="form-inline">
        <input onChange={handleSearch} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        </input>
        {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
        </form>

        {/* <button className="" onClick={addNewEmployee}>Login</button> */}
        {/* <button className="" onClick={addNewEmployee}>Register</button> */}
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
</nav>
        <select onChange={handleSortButton} style={{marginBottom:'15px'}} className="form-select" aria-label="Default select example">
            <option value="sortby">Sort By</option>
            <option value="firstName">FirstName</option>
            <option value="lastName">LastName</option>
            <option value="email">Email</option>
</select>
        {hasSearched
        &&
        (
            searchResults.length > 0
            ?
            (
            searchResults.map(employee => (
                <div key={employee.id} className='alert alert-info'>
                    <p>{employee.firstName} {employee.lastName} - {employee.email}</p>
                </div>
            ))
            )
        :( 
            <div className='alert alert-warning'>No results found</div>
       ) )}
        <button className='btn btn-primary' onClick={addNewEmployee} style={{marginBottom: "10px"}}>Add Employee</button>
        <table className='table table-striped table-bordered'> 
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Profile Img</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>
                        <img src={`http://localhost:8778/api/image/${employee.id}`} alt='profile'
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}></img>
                        </td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button className='btn btn-info' onClick={()=>handleUpdate(employee.id)}>Update</button>
                            <button className='btn btn-danger' style={{marginLeft:'10px'}} onClick={()=>handleDelete(employee.id)}>Delete</button>
                            <button className='btn btn-success' style={{marginLeft:'10px'}} onClick={()=>navigate(`/view-employee/${employee.id}`)}>View</button>
                        </td>
                    </tr>
                    
                ))}
            </tbody>
        </table>
       
    </div>
  )
}

export default ListEmployeeComp
