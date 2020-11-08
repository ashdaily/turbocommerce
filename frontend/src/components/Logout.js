import React from "react";
import axios from "../util/Axios";


export default ({setLogout})=>{
    function doLogout(){
        // make payload
        const payload = {
          "client_id": process.env.REACT_APP_DJANGO_OAUTH_GENERATED_CLIENT_ID,
          "client_secret": process.env.REACT_APP_DJANGO_OAUTH_GENERATED_CLIENT_SECRET,
          "token": localStorage.getItem("accessToken")
        }

        /*
            send convert token request to django social auth
            & then set localStorage
        */
        axios.post("auth/revoke-token/", payload)
        .then(response => {
            if(response.status === 204){
                // clear localStorage FIXME: this is bad
                localStorage.clear();
                setLogout(true);
            }
        });
    }

    return(
        <span onClick={doLogout}>Logout</span>
    )
}
