import React from "react";
import{ useHistory} from "react-router-dom";
import "../signUp_button.css";

function SignupButton (){
    const history = useHistory();

    return(
        <button 
        
        onClick={() => {
            history.push("/signup");
        }}
        class="my-signup-button" 
        >
          Signup  
        </button>
    )
}

export default SignupButton;