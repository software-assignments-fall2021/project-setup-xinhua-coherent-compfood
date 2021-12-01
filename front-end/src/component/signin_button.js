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
        class="button-73" role="button"
        >
          Login  
        </button>
    )
}

export default SigninButton;
