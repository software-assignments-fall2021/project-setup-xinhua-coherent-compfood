import {React, useState} from 'react';
import { useHistory } from "react-router-dom";
import '../signIn.css';
import axios from 'axios'
const SignIn = () => {
    const [username, setusername] = useState("initialState")
    const [password, setpassword] = useState("initialState")

    const history = useHistory();

    const routeChange = () =>{ 
      let path = `http://localhost:61001/login`; 
      history.push(path);
    }
    const handleSubmit = (event) => {
      event.preventDefault(); 
      const payload = {
          username: username,
          password: password
        };
        axios({
          url: 'http://localhost:61001/login',
          method: 'POST',
          data: payload
        })
          .then(() => {
            console.log('Data has been sent to the server');
            this.resetUserInputs();
            this.getBlogPost();
          })
          .catch(() => {
            console.log('Internal server error');
          });;  
    };
    return (
      <form onSubmit={handleSubmit}>
      <div>
          <div className = "sign-in-page-title">
              Sign in Page
          </div>
          <div className = "username-box-outside-border">
            <input type = "text" className = "username-box" placeholder = "username..."
              onChange = {(event) => {
                setusername(event.target.value)
              }}
            
            />
          </div>
          <div className = "password-box-outside-border">
            <input type = "text" className = "password-box" placeholder = "password..."
              onChange = {(event) => {
                setpassword(event.target.value)
              }}
            />
          </div>
          <div className = "login-button-outside-border">
              <button className = "login-button" onClick={routeChange}>
                  Sign in
              </button>
          </div>
          <div>
            <p>New to CompFood? <a href="/signup">Sign Up</a></p>
          </div>
      </div>
      </form>
    );
}

export default SignIn;