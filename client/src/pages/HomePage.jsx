import React from "react";
import Banner from "../components/Banner";
import DreamVacation from "../components/DreamVacation";
import NextTrip from "../components/NextTrip";
import Hotel from "../components/Hotel";


const HomePage = () => {
  return (
    <div>
         <Banner/>
         <Hotel />
         <DreamVacation/>
         <NextTrip/>
          
    </div>
  );
};

export default HomePage;