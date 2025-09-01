import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Title from "./Title";
import img from '../assets/image3.png';


const Hotel = () => {
  const [posts, setPosts] = useState([]);   // ✅ plural name

  // Fetch all posts
  const handleApi = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
      );
      setPosts(response.data.posts || []);   // ✅ safe check
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  // Image rotation logic
  const [imageIndexes, setImageIndexes] = useState({});

  useEffect(() => {
    if (posts.length === 0) return;  // ✅ avoid empty crash
    const interval = setInterval(() => {
      setImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        posts.forEach((post) => {
          const currentIndex = newIndexes[post._id] || 0;
          newIndexes[post._id] = (currentIndex + 1) % post.images.length;
        });
        return newIndexes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [posts]);

  return (
    <div className="container mx-auto  bg-blue-50 ">
          <div className=' flex flex-col items-center px-6 md:px-16 lg:px-24 bg-blue-50 py-20 '>
        
        <Title title='Looking for your perfect PG?' subTitle='Discover the best PG accommodations tailored for students and working professionals — comfort, convenience, and community, all in one place'/>
        </div>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {posts.map((hotel) => (
          <Link
            to={`/product/${hotel.slug}`}
            key={hotel._id}
            className="block"
          >
            <div className="bg-white rounded-lg overflow-hidden mx-auto w-64 cursor-pointer shadow-md hover:shadow-xl transition">
              <img
                src={hotel.images[imageIndexes[hotel._id] || 0]}
                alt={hotel.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{hotel.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Hotel;



