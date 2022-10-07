import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";

const Googlelogin = () => {

    const clientId = '317246931927-jcahmmoa74nit40ciubn481gkv9dnqpn.apps.googleusercontent.com';
    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showLogoutButton, setShowLogoutButton] = useState(false);

    const onLoginSuccess = (res) => {
        axios.post('http://localhost:1999/googleSignup', {
            "google_Id": res.profileObj.googleId,
            "name": res.profileObj.givenName,
            "email": res.profileObj.email
        }).then((res) => {
            console.log(res, "ghkjh")
        })

        console.log(res, "jgfjkgjkdkjgh")
        console.log("Login Success", res.profileObj);
        setShowLoginButton(false);
        setShowLogoutButton(true);

    }

    const onFailureSuccess = (res) => {
        console.log("Login Failed:", res);
        setShowLoginButton(true);
        setShowLogoutButton(false);
    }

    const onSignoutSuccess = () => {
        alert("You have been signout successfully");

    }
    // const handleLogin = () => {
    //     console.log("Loginn Success")
    // }

    // useEffect(() => {
    //     const initClient = () => {
    //         gapi.client.init({
    //             clientId: clientId,
    //             scope: ''
    //         });
    //     };
    //     gapi.load('client:auth2', initClient);
    // });

    // const onSuccess = (res) => {
    //     console.log('success:', res);
    //     console.log()
    // };
    // const onFailure = (err) => {
    //     console.log('failed:', err);
    // };

    return (

        <div>
            {showLoginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onFailureSuccess}
                    cookiePolicy={'single_host_origin'}
                /> : null
            }
            {showLogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null}
        </div>
    )
}

export default Googlelogin
