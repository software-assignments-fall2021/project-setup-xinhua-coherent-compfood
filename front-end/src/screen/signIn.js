import React from 'react';
import '../signIn.css';

const SignIn = () => {
    return (
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
            <p>New to CompFood? Click <a href="/signup">here</a> to make an account.</p>
          </div>
      </div>
    );
}

export default SignIn;