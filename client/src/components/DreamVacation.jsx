import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image1 from "../assets/Post/Rectangle 8.png";
import Image2 from "../assets/Post/Rectangle 9.png";
import Image3 from "../assets/Post/Rectangle 10.png";
import Image4 from "../assets/Post/Rectangle 11.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// ❌ You cannot import backend models directly into frontend React
// import Category from "../../../server/src/models/Category";

const DreamVacation = () => {
  // const [category, setCategory] = useState([]);
  // const navigation = useNavigate();

  // const getAllCategory = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
  //     );
  //     setCategory(response.data.category);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllCategory();
  // }, []);

  // const categoryImages = [
  //   { name: "Australia", image: Image1 },
  //   { name: "Japan", image: Image2 },
  //   { name: "New Zealand", image: Image3 },
  //   { name: "Greece", image: Image4 },
  // ];

  // const getImageForCategory = (categoryName) => {
  //   const categoryImage = categoryImages.find(
  //     (item) => item.name === categoryName
  //   );
  //   return categoryImage ? categoryImage.image : null;
  // };

  const destinations = [
    { image: Image1, name: "Australia", properties: 2246 },
    { image: Image2, name: "Japan", properties: 1278 },
    { image: Image3, name: "New Zealand", properties: 480 },
    { image: Image4, name: "Greece", properties: 320 },
  ];

  return (
    // <div className="flex flex-col mt-14 px-4 mx-auto max-w-screen-xl sm:ml-[175px]">
     <div className="flex flex-col mt-14 "> 
    {/* Title */}
      {/* <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-center sm:text-left sm:ml-0"> */}
      <h1 className="text-3xl  font-semibold mb-2 ml-[12rem]">
        Enjoy your dream vacation
      </h1>

      {/* Description */}
      <p className="text-gray-600 mb-10 max-w-xl ml-[12rem]">
        Plan and book your perfect trip with expert advice, travel tips,
        destination information, and inspiration from us
      </p>

      {/* Destinations */}
      {/* <div className="flex flex-wrap gap-4 justify-center sm:justify-start"> */}
      <div className="flex  gap-4 justify-center ">
        {destinations.map((destination, index) => (
          <div key={index} className="text-center w-full sm:w-[18rem]">
            <img
              src={destination.image}
              alt={destination.name}
            //   className="w-full h-48 object-cover rounded-lg"
              className="w-[18rem] h-48 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2">
              {destination.name}
            </h2>
            <p className="text-gray-500">
              {destination.properties}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DreamVacation;
