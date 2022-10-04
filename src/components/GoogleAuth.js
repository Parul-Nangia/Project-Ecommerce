import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';





// 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


function GoogleAuth () {
const clientId = '911764288983-7281acg9669p5rrr4ii8fi9od3p0l3ap.apps.googleusercontent.com';

useEffect(() => {
   const initClient = () => {
         gapi.client.init({
         clientId: clientId,
         scope: ''
       });
    };
    gapi.load('client:auth2', initClient);
});


const onSuccess = (res) => {
  console.log('success:', res);
};
const onFailure = (err) => {
  console.log('failed:', err);
};
    return(

      <div className="Glog">
            <GoogleLogin 
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            ></GoogleLogin>

          </div>

    )

}
export default GoogleAuth;