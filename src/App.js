import React from 'react';
import 'antd/dist/antd.css';
import './App.css';


import SiteLayout from './shared/Sitelayout';
import { useState, useEffect } from 'react';


const App = () => {

  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setIsLogin(true);

  }, [])
  return (
    <>
      <SiteLayout isLogin={isLogin} />

    </>
  )
}
export default App;

