import React from "react";
import{ useHistory} from "react-router-dom";

function SigninButton (){
    const history = useHistory();

    return(
        <button 
        
        onClick={() => {
            history.push("/login");
        }}
        
        >
          Login  
        </button>
    )
}

export default SigninButton;
