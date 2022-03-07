import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/authActions';
import './login.css';

const Login = () => {

    const loginStatus = useSelector(state => state.authorization.isLoggedIn);
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [msg, updateAlertMsg] = useState({
        message: '',
        status: ''  
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formHandler = (e) => {
        e.preventDefault();
        e.target.reset();

        dispatch(loginAction({ email, password }))
        .then(() => {
            console.log("login was great!");
            navigate("/");
        })
        .catch(() => {
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
    );
  
    if (loginStatus) {
        return <Navigate to="/" />
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