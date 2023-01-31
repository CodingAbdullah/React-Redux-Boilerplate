import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducers/authReducer';
import './login.css';

const Login = () => {
    const userSelector = useSelector(state => state.auth.user);
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");

    const [msg, updateAlertMsg] = useState({
        message: '',
        status: ''  
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userSelector !== null) {
            navigate("/")
        }
    }, [userSelector, navigate])

    const formHandler = (e) => {
        e.preventDefault();
        e.target.reset();

        // Dispatch login action 
        dispatch(login({ email, password }));
        if (userSelector === null && !userSelector.isLoading && !userSelector.isSuccess) {
            updateAlertMsg((prevState) => {
                return {
                    ...prevState,
                    message: "Invalid credentials",
                    status: 'danger'
                }
            });
        }
    }

    const message = (
        <div class={`alert alert-${msg.status}`}>
            {msg.message}
        </div>
    );
  
    return (
        <div className="Login">
            { message }
            <h1>Login Form</h1>
            <form onSubmit={formHandler}>
                <div className="input-group mb-3">
                    <input type="email" onChange={(e) => updateEmail( e.target.value )} className="form-control" placeholder="Email" />
                    <input type="password" onChange={(e) => updatePassword( e.target.value )} className="form-control" placeholder="Password" />
                </div>
                <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
        </div>
    )
}

export default Login;