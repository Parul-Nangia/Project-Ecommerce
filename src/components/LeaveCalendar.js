import { Alert, Avatar, Button, Calendar, Badge} from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";



const LeaveCalendar = () => {
  
  const [weekLeave, setweekLeave] = useState([]);
  


  const thisWeekEmployeeLeaveData = () => {
    fetch("http://localhost:1999/leave/WeekData")

      .then((response) => {
        return response.json();
      }).then((empWeekdata) => {

        let empWeekLeave = empWeekdata.data
        console.log("Weekly On Leave",empWeekLeave)
       

        setweekLeave(empWeekLeave)
       
      })

  }
  useEffect(() => {
    thisWeekEmployeeLeaveData();

  }, [])

  



  // const data = [
  //   {
  //     id: 1,
  //     content: "Example",
  //     date: "01/10/2022",
  //     horario: ["2022-10-26T06:00:00.925Z", "2022-10-26T07:00:00.478Z"]
  //   },
  //   {
  //     id: 2,
  //     content: "Example",
  //     date: "08/10/2022",
  //     horario: ["2022-10-26T11:00:00.859Z", "2022-10-26T14:00:00.976Z"]
  //   }
  // ];

  // YYYY-MM-DDTHH:mm:ss.sssZ

  const dateCellRender = (value) => {
    
    const stringValue = value.format("YYYY-MM-DD");
    const listData = weekLeave.filter(({ LeaveDate }) => LeaveDate === stringValue);
    
<<<<<<< Updated upstream
      <>
      <h2> </h2>
      <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
      <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
      </>
        
     )
} 

export default LeaveCalendar;
=======
    
    return (
      <ul className="events">
        {listData.map((item) => (
          
          <li key={item.EmployeeName}>       
            <Badge status={"success"} text={item.EmployeeName} />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};

export default LeaveCalendar;
>>>>>>> Stashed changes
