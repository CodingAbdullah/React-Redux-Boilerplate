import './signup.css';
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {

  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [msg, updateAlertMsg] = useState({
    message: '',
    status: ''  
  });
  
  const formHandler = (e) => {
    e.preventDefault();
    e.target.reset();

    const options = {
      method: 'POST',
      "Access-Control-Allow-Origin": "*",
      headers : {
        'Content-Type': 'application/json'
      },    
    }

    axios.post("http://localhost:3001/signup", { firstName, lastName, email, password }, options)
    .then(response => {
        if (response.status === 201) {
          updateAlertMsg((prevState) => {
            return {
              ...prevState,
              message: "User Successfully Signed Up",
              status: 'success'
            }
          });
        }
        else {
          updateAlertMsg((prevState) => {
            return {
              ...prevState,
              message: "Invalid Sign Up",
              status: 'danger'
              }
          });
        }
    })
    .catch(err => {
      console.log(err);
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
            <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    );
}

export default Signup;
