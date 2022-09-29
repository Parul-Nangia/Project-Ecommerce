import React from 'react';
import "./widget.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';


const Widget = ({type}) => {
  let data;


// temp

const leave =10;
const diff = 5;

  switch(type) {
    case "user":
      data ={
        title: "USERS",
        isLeave: false,
        link:"See all users",
        icon:<PersonOutlinedIcon className="Icon"/>,
      };
      break;
      case "leave":
      data ={
        title: "LEAVE",
        isLeave:true,
        link:"View leave",
        icon:<LocalPharmacyIcon className="Icon"/>,
      };
      break;
      case "holiday":
      data ={
        title: "HOLIDAY",
        isLeave: true,
        link:"See all holidays",
        icon:<HolidayVillageIcon className="Icon"/>,
      };
      break;
      case "status":
      data ={
        title: "STATUS",
        isLeave: true,
        link:"See all status",
        icon:<RunningWithErrorsIcon className="Icon"/>,
      };
      break;
      default:
        break;
  }

  return (
          <div className="widget">
            <div className="left">
              <span className="title">{data.title}</span>
              <span className="counter">
                {data.isLeave}{leave}</span>
              <span className="link">See all users</span>
            </div>
            <div className="right">
              <div className="percentage positive">
               <KeyboardArrowUpIcon  /> 
                {diff} %
              </div>
              {data.icon}
            </div>
          </div> 




    
  );
};

export default Widget
