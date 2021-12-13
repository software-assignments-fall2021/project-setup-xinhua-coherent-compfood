import React from "react";
import{ useHistory} from "react-router-dom";
import "../signIn_button.css";

function SigninButton (){
    const history = useHistory();

    return(
        <button 
        
        onClick={() => {
            history.push("/login");
        }}
        className="my-signin_button" 
        >
          Login  
        </button>
    )
}

export default SigninButton;
