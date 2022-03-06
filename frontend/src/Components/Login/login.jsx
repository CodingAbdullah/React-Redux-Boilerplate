import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './login.css';

const Login = () => {

    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [msg, updateAlertMsg] = useState({
        message: '',
        status: ''  
      });
    const navigate = useNavigate();

    const formHandler = (e) => {
        e.preventDefault();
        e.target.reset();

        const options = {
            method: 'POST',
            'content-type': 'application/json',
        }

        axios.post("http://localhost:3001/login", { email, password }, options)
        .then(response => {
            console.log(response);

            if (response.status !== 201) {
                updateAlertMsg((prevState) => {
                  return {
                    ...prevState,
                    message: "User could not login",
                    status: 'danger'
                  }
                });
                navigate("/login");
            }
            else {
                localStorage.setItem('token', response.data.token);
                navigate("/");
            }
        })
        .catch(err => {
            console.log(err);
            updateAlertMsg((prevState) => {
                return {
                  ...prevState,
                  message: "User could not login",
                  status: 'danger'
                }
            });
            navigate("/login");
        });
    }

    const message = (
        <div class={`alert alert-${msg.status}`}>
          {msg.message}
        </div>
      )
  
    if (localStorage.getItem('token')) {
        navigate("/");
    }
    else {
        return (
            <div className="Login">
                {message}
                <h1>Login Form</h1>
                <form onSubmit={formHandler}>
                    <div className="input-group mb-3">
                        <input type="email" onChange={(e) => updateEmail(e.target.value )} className="form-control" placeholder="Email" />
                        <input type="password" onChange={(e) => updatePassword(e.target.value)} className="form-control" placeholder="Password" />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Login;