import React from 'react';
import '../signIn.css';

const SignIn = () => {
    const handleSubmit = (event) => {
      event.preventDefault(); 
      const payload = {
          username: username,
          password: password
        };
    };
    return (
      <form onSubmit={handleSubmit}>
      <div>
          <div className = "sign-in-page-title">
              Sign in Page
          </div>
          <div className = "username-box-outside-border">
            <input type = "text" className = "username-box" placeholder = "username..."/>
          </div>
          <div className = "password-box-outside-border">
            <input type = "text" className = "password-box" placeholder = "password..."/>
          </div>
          <div className = "login-button-outside-border">
              <button className = "login-button">
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