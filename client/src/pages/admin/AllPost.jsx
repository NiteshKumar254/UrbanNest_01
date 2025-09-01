   import React, { useEffect, useState } from "react";
   import Navbar from "./Navbar";
   import axios from "axios";
   import { toast } from "react-toastify";
   import { useNavigate } from "react-router-dom";

   const AllPost = () => {
     const [postData, setPostData] = useState([]);
    //  console.log ("post data from Api", postData);
    //  const [currentImageIndex, setCurrentImageIndex] = useState(0);
    //  const navigate = useNavigate();

     const handleApi = async () => {
       try {
        const response = await axios.get(
           `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
      );
      setPostData(response.data.posts);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleApi();
  }, []); (()=>{
    handleApi();},[]);

   return (
    <div className='flex justify-between'>
      <Navbar/>
    <div>
      AllPost
    </div>
    </div>
  );
}

export default AllPost;



