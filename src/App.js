import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Routing from './components/Routing';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import { Breadcrumb, Layout } from 'antd';
const { Content } = Layout;





const App = () => (
  <>


    <BrowserRouter>
      <Routing />

    </BrowserRouter>







  </>
)



export default App;