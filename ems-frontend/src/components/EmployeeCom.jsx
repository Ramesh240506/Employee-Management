import React, { useEffect, useState } from 'react'
import { addEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeCom = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
        if(id) 
        {
            const file = e.target.files[0];
            console.log("Selected file:", file);
            if (file) {
                setImagePreview(URL.createObjectURL(file));
            }
            
        }
    }


    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    const {id}=useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(id) {

            // Fetch employee data if id is present
            // This is for update operation
            //It displays the existing employee data in the form
            
            console.log("Fetching employee data for id:", id);
            
            getEmployeeById(id).then((response)=>{
                const empData=response.data;
                setFirstName(empData.firstName);
                setLastName(empData.lastName);
                setEmail(empData.email);
                
            }).catch(error=>{
                console.error("Error fetching employee data:", error);
            })
        }
    }, [id]);
    const handleSubmit = (e) => {

        e.preventDefault();
        
        if(validateForm()) {
            const employee = { firstName, lastName, email };
            const formData = new FormData();
            formData.append('profileImage', profileImage);
            formData.append('employee',new Blob([JSON.stringify(employee)],
             { type: 'application/json' }));
            if(id) {
                
            updateEmployee(id, formData).then((response)=> {
                console.log("Employee updated successfully", response.data);
                navigate('/employees');
                alert("Employee updated successfully");
            })
            }
            else {
            addEmployee(formData).then((response)=> {
            console.log("Employee added successfully", response.data);
            navigate('/employees');
            })
        }
        console.log(employee);
         
    }
    }

    const validateForm = () => {
        let isValid = true;
        const errorsCopy ={...errors};

        if(firstName.trim()) {
            errorsCopy.firstName = "";
        }
        else {
            errorsCopy.firstName = "First name is required";
            isValid = false;
        }
        if(lastName.trim()) {
            errorsCopy.lastName = "";
        }
        else {
            errorsCopy.lastName = "Last name is required";
            isValid = false;
        }
        if(email.trim()) {
            errorsCopy.email = "";
        }
        else {
            errorsCopy.email = "Email is required";
            isValid = false;
        }
        setErrors(errorsCopy);
        return isValid;
}
    const pageTitle = id ? "Update Employee" : "Add Employee";

  return (
    <div className='container' style={{marginTop: "20px"}}>
        <div className='row'>
        <div className='card col-md-6 offset-md-3' style={{padding: "20px"}}>
        <h2 className='text-center'>{pageTitle}</h2>
            <div className='card-body' style={{marginBottom: "20px"}}>
        <form>
            <div className="form-group mb-3">
                <label className='form-label'>Employye profile: </label>
                {imagePreview==null && pageTitle === "Update Employee" && (
    <div style={{ marginBottom: '10px' }}>
        <img 
            src={`http://localhost:8778/api/image/${id}`} 
            alt='profile'
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ccc' }}
        />
    </div>
)}
               
                
                <input src={imagePreview} type="file" className='form-control' onChange={handleImageChange} accept="image/*"/>
                
            { imagePreview && (
                <div className="mt-3">
                    <img 
                        src={imagePreview} 
                        alt='profile preview'
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                </div>
            )}
            </div>
            <div className="form-group mb-3">
                <label className='form-label'>First Name:</label>
                <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className={`form-control ${errors.firstName ? 'is-invalid': ''}`} placeholder="Enter first name" />
                {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
            </div>
            <div className="form-group mb-3">
                <label className='form-label'>Last Name:</label>
                <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className={`form-control ${errors.lastName ? 'is-invalid': ''}`} placeholder="Enter last name" />
                {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
            </div>
            <div className="form-group mb-3">
                <label className='form-label'>Email:</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className={`form-control ${errors.email ? 'is-invalid': ''}`} placeholder="Enter email" />
                {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
        </form>
        </div>
        </div>
        </div>
    </div>
  )
}

export default EmployeeCom
