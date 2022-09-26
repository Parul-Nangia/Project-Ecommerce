import React from 'react';
import Logo from './AttendanceCards';
import { NavLink } from 'react-router-dom';
import Dashboard from './Dashboard';
import {makeStyles} from "@material-ui/core"


const useStyles = makeStyles({
nl :{ 
    backgroundColor:"#87CEEB",
    padding:"13px",
    marginTop:"-27px",
   
    

},
// n2:{
//     color:"Black",
//     fontWeight:"bold",
//     marginTop:"2px",
    
    
// }
})
const Header=()=>{
    const classes = useStyles();
    return(

        <nav>
            <div className="div-header">
                
                <div className={classes.nl}>
                    <NavLink to="/" className={classes.n2}>Logout</NavLink>
                    
                </div>
            </div>    
            


        </nav>

    )

}

export default Header
    
