import React from "react";
import {Navigate} from "react-router-dom";


function Profile({authorized}) {
    if (!authorized){
    return <Navigate to ="/login" />
    }
    return <div>Allowed You to enter.</div>;
}



export default Profile;