import React from 'react';
import 'antd/dist/antd.css';
import './App.css';


import SiteLayout from './shared/Sitelayout';
import { useState, useEffect } from 'react';
import LoginNew from './components/LoginNew';


const App = () => {
  

  const [isLogin, setIsLogin] = useState(false);
  // const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const isLogin = localStorage.getItem("access_token1");
    if (isLogin) {
      console.log(localStorage.getItem("access_token1"), "login token")
      const tokenCheck = localStorage.getItem("access_token1") ? true : false;
      console.log(tokenCheck)
      setIsLogin(tokenCheck);
    }
    // setIsLogin(true);

  }, [])

  return (
    <>
      <SiteLayout  isLogin={isLogin}/>

    </>
  )

}
export default App;