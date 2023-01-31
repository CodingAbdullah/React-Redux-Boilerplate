import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/reducers/authReducer';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userSelector = useSelector(state => state.auth.user);

    useEffect(() => {
        if (userSelector === null) {
            navigate("/"); // There is no logged user, navigate back to home
        } 
        else {
            dispatch(logout()); // Dispatch logout on mount
        }   
    }, [])

    return (
        <div className="logout-page">
            <h1>User has been logged out</h1>
            <button style={{ marginTop: '2rem' }} class="btn btn-primary" onClick={() => navigate("/")}>Go Home</button>
        </div>
    )
}


export default Logout;