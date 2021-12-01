import React from "react";
import{ useHistory} from "react-router-dom";
//import "../signIn_button.css";

function SignupButton (){
    const history = useHistory();

    return(
        <button 
        
        onClick={() => {
            history.push("/signup");
        }}
        class="button-73" role="button"
        >
          Sign In  
        </button>
    )
}

export default SignupButton;