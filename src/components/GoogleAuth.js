import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { useState } from 'react';
import  axios  from 'axios';


const Googlelogin = () => {

  const responseGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:1999/user/googlelogin",
      data: {tokenId: response.tokenId}
    }).then(response => {
      console.log("Google Login Success",response);
    })
  }

  return (

  <GoogleLogin
    clientId="782778790753-11hlt4rsr491dbmdaej4udve468rldgr.apps.googleusercontent.com"
    buttonText="Login with Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
























    // function SignInWithGoogle() {
    //     console.warn({google_Id, name, email});
    //     let data = {google_Id, name, email}


    //     fetch("http://localhost:1999/with/googleSignup", {
    //       method: 'POST',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(data)
    //     }).then((Guser) => {
    //       console.warn("result", Guser);
    //       window.alert("SignUp with Google Success")

    //     })

    //   }


    // const clientId = '317246931927-jcahmmoa74nit40ciubn481gkv9dnqpn.apps.googleusercontent.com';
    // const[showLoginButton,setShowLoginButton]=useState(true);
    // const [showLogoutButton ,setShowLogoutButton]=useState(false);

    // const onLoginSuccess = (res)=>{
    //     console.log("Login Success",res.profileObj);
    //     setShowLoginButton(false);
    //     setShowLogoutButton(true);
    // }

    // const onFailureSuccess =(res) =>{
    //     console.log("Login Failed:",res);
    //     setShowLoginButton(true);
    //     setShowLogoutButton(false);
    // }

    // const onSignoutSuccess=()=>{
    //     alert("You have been signout successfully");

    // }
    // // useEffect(() => {
    // //     const initClient = () => {
    // //         gapi.client.init({
    // //             clientId: clientId,
    // //             scope: ''
    // //         });
    // //     };
    // //     gapi.load('client:auth2', initClient);
    // // });
    // // const onSuccess = (res) => {
    // //     console.log('success:', res);
    // //     console.log()
    // // };
    // // const onFailure = (err) => {
    // //     console.log('failed:', err);
    // // };

    // return (

    //    <div>
    //         {showLoginButton ?
    //         <GoogleLogin 
    //             onClick = {SignInWithGoogle}
    //             clientId={clientId}
    //             buttonText="Sign in with Google"
    //             onSuccess={onLoginSuccess}
    //             onFailure={onFailureSuccess}
    //             cookiePolicy={'single_host_origin'}
    //         /> : null
    //        }
    //           {showLogoutButton ? 
    //             <GoogleLogout
    //                 clientId={clientId}
    //                 buttonText="Logout"
    //                 onLogoutSuccess={onSignoutSuccess}
    //                 >
    //                 </GoogleLogout>:null}
    //         </div>
  )
}

export default Googlelogin