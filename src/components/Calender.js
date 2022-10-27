import React from "react";
import { Header } from "../components";

const Calender = () => {
  // const [value, onChange] = useState(new Date());
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md-p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      {/* <Calendar onChange={onChange} value={value} />
      {value.toString()} */}
    </div>
  );
};

export default Calender;
