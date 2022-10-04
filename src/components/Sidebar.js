
import {Menu} from 'antd';
import {useNavigate} from "react-router-dom";
import Navbar from './Navbar';

function Sidebar() {
    
    return (
        <div>
            <Navbar />
        <div>
            <SideMenu />
        </div>
        </div>


    );

}

function SideMenu(){
    const navigate = useNavigate();
    return(
        <div style ={{display:"absolute" ,marginTop:"60px", flexDirection:"column",color:"#FF4500"}}>
            <Menu
            onClick={({key})=>{
                if(key==="signout"){

                }else{
                    navigate(key);
                }

            }}
            items={[
                {label:"Employees" , key:"/employees"},
                {label:"Dashboard" , key:"/dashboard"},
                {label:"Attendance" , key:"/attendance"},
                {label:"Leave" , key:"/leave"},
            ]} style={{position:"fixed",backgroundColor:"#FF4500",alignItems:"baseline",height:"100vh"}}
            ></Menu>

            </div>
    )
}


export default Sidebar