import React, { useState } from "react";
import { loginUser, registerUser } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", password: "", confirmPassword: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Please fill all required fields");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (isLogin) {
      console.log("Login data:", formData);
      loginUser({
        username: formData.username,
        password: formData.password,
      })
        .then((response) => {
          if(response.data&&response.data.accessToken)
          {
            localStorage.setItem("token", response.data.accessToken);
  
            console.log("Token saved to localStorage", response.data.accessToken);
  
            console.log("User logged in successfully", response.data);
          }
          alert("Login successful");

          navigate("/employees");
        })
        .catch((error) => {
          console.error("Error during login:", error);
          alert("Login failed. Please check your credentials.");
        });
      // Add login API call here
    } else {
      console.log("Register data:", formData);
      // Add registration API call here
      registerUser({
        username: formData.username,
        password: formData.password,
      })
        .then((response) => {

          console.log("User registered successfully", response.data);
          alert("Registration successful");
          toggleForm(); // Switch to login form after successful registration

        })
        .catch((error) => {
          console.error("Error during registration:", error);
          alert("Registration failed. Please try again.");
        });
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            required
          />
        )}
        <button type="submit" style={styles.button}>
          {isLogin ? "Login" : "Register"}
        </button>
        <p style={styles.switchText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={toggleForm} style={styles.link}>
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </form>
    </div>
  );
};

// Simple CSS-in-JS styles
const styles = {
  container: {
    width: "300px",
    margin: "50px auto",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
    background: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  switchText: {
    marginTop: "10px",
    fontSize: "14px",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default AuthForm;
