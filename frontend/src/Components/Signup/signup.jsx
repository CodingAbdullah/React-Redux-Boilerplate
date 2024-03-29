import './signup.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Signup = () => {
    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");

    const [msg, updateAlertMsg] = useState({
      message: '',
      status: ''  
    });

    const userSelector = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
      if (userSelector !== null) {
          navigate("/");
      }
    }, [userSelector, navigate])
    
    const formHandler = (e) => {
      e.preventDefault();
      e.target.reset();
    
      let options = {
        method: 'POST',
        body : JSON.stringify({ firstName, lastName, email, password })
      }

      axios.post("http://localhost:5000/register", options)
      .then(() => {
          updateAlertMsg((prevState) => {
            return {
              ...prevState,
              message: "User Successfully Signed Up",
              status: 'success'
            }
          });
      })
      .catch(() => {
          updateAlertMsg((prevState) => {
            return {
              ...prevState,
              message: "Invalid Sign Up",
              status: 'danger'
              }
          });
      });
    }

    const message = (
      <div class={`alert alert-${msg.status}`}>
        {msg.message}
      </div>
    )

    return (
      <div className="Signup">
        {message}
        <h1>Sign Up Form</h1>
        <form onSubmit={formHandler}>
            <div className="input-group mb-3">
              <input type="text" onChange={(e) => updateFirstName(e.target.value)} className="form-control" placeholder="First Name" />
              <input type="text" onChange={(e) => updateLastName(e.target.value)} className="form-control" placeholder="Last Name" />
            </div>
            <div className="mb-3">
              <input type="email" onChange={(e) => updateEmail(e.target.value)} className="form-control" placeholder="Email" />
            </div>
            <div className="mb-3">
              <input type="password" onChange={(e) => updatePassword(e.target.value)} className="form-control" placeholder='Password' />
            </div>
            <input style={{marginTop: '1.5rem'}} type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    );
  }

export default Signup;
