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
        class="button-70" role="button"
        >
          Signup  
        </button>
    )
}

export default SignupButton;