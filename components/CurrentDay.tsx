import React from "react";

const CurrentDay = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const day = days[currentDate.getDay()];
  const date = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear().toString().slice(-2); 
  const time = currentDate.toLocaleTimeString();

  return (
    <div>
      <p>
        {day}, {date} {month} {year}
      </p>
    </div>
  );
};

export default CurrentDay;
