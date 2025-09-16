import React from "react";
import Banner from "../components/Banner";

import Hotel from "../components/Hotel";
import TopCities from "./TopCities";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import Advertisement from "../components/Advertisement";





const HomePage = () => {
  return (
    <div className="bg-grey-800">
         <Banner/>
         <Hotel />
         <TopCities/>
         <HowItWorks/>
    
    
          
    </div> 
  );
};

export default HomePage;