import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Routing from './components/Routing';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login';





const App = () => (
  <>


    <BrowserRouter>

      <Login />
    </BrowserRouter>


                    
                        
                                <Routing />

                      

                </>
        )



export default App;