import './signup.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAction } from '../../redux/actions/authActions';

const Signup = () => {

    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [age, updateAge] = useState(0);
    const [gender, updateGender] = useState("male");
    const [msg, updateAlertMsg] = useState({
      message: '',
      status: ''  
    });
    
    const dispatch = useDispatch();

    const formHandler = (e) => {
      e.preventDefault();
      e.target.reset();

      dispatch(registerAction({firstName, lastName, age, email, password, gender}))
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
            <div className="mb-3">
              <input type="number" onChange={(e) => updateAge(e.target.value)} className="form-control" placeholder='Age' />
            </div>
            <div class="mb-3">
                <input class="form-check-input" id="male-button" onChange={() => updateGender("male")} type="radio" name="gender" value="male" checked />
                <label style={{marginLeft: '1.5rem'}} class="form-check-label">Male</label>
            </div>
            <div>
                <input class="form-check-input" id="female-button" onChange={() => updateGender("female")} type="radio" name="gender" value="female" />
                <label style={{marginLeft: '1.5rem'}} class="form-check-label">Female</label>
            </div>
            <input style={{marginTop: '1.5rem'}} type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    );
}

export default Signup;
