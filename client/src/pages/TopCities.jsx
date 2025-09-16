import { useNavigate } from "react-router-dom";

const TopCities = () => {
  const navigate = useNavigate();

  const cities = [
    { name: "Delhi", image: "https://s7ap1.scene7.com/is/image/incredibleindia/india-gate-delhi-1-attr-hero?qlt=82&ts=1742159856441" },
    { name: "Patna", image: "https://www.treebo.com/blog/wp-content/uploads/2022/09/Buddha-Smriti-Park-1024x675.jpg" },
    { name: "Mumbai", image: "https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2Fimage.jpg%2Fimage-1735884840040.jpg&w=2048&q=75" },
    { name: "Bhopal", image: "https://www.foodravel.com/wp-content/uploads/2024/07/IMG_5004.jpg" },
    { name: "Bangalore", image: "https://images.livemint.com/img/2021/01/15/600x338/bangalore_1610687205585_1610687212519.jpg" },
    { name: "Pune", image: "https://www.nobroker.in/blog/wp-content/uploads/2025/02/cost-of-living-in-pune.webp" },
    { name: "Indore", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIAU1tjE8RFiq7541jxaosnewUU5-xQGovpw&s" },
    { name: "Kolkata", image: "https://assets.gqindia.com/photos/648185e00129d966909de09a/master/pass/Kolkata-City-Guide_07.jpg" },
    { name: "Hyderabad", image: "https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/depositphotos669042260xl-1734400332096.jpg" },
    { name: "Chennai", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUZm4aiPFCaKG7z66hL_zccSlLR1_1Q9LWIw&s" },
    
    { name: "Noida", image: "https://www.holidify.com/images/bgImages/NOIDA.jpg" },
    { name: "Gurgaon", image: "https://www.holidify.com/images/bgImages/GURGAON.jpg" },
    { name: "Ahmedabad", image: "https://www.holidify.com/images/bgImages/AHMEDABAD.jpg" },
    { name: "Jaipur", image: "https://www.holidify.com/images/bgImages/JAI.jpg" },
    { name: "Lucknow", image: "https://www.holidify.com/images/bgImages/LUCKNOW.jpg" },
    { name: "Chandigarh", image: "https://www.holidify.com/images/bgImages/CHANDIGARH.jpg" },
    { name: "Coimbatore", image: "https://www.holidify.com/images/bgImages/COIMBATORE.jpg" },
    { name: "Nagpur", image: "https://www.holidify.com/images/bgImages/NAGPUR.jpg" },
    { name: "Visakhapatnam", image: "https://www.holidify.com/images/bgImages/VISAKHAPATNAM.jpg" },
    { name: "Surat", image: "https://www.holidify.com/images/bgImages/SURAT.jpg" },
    { name: "Kanpur", image: "https://www.holidify.com/images/bgImages/KANPUR.jpg" },
    { name: "Mysore", image: "https://www.holidify.com/images/bgImages/MYSORE.jpg" },
    { name: "Vijayawada", image: "https://www.holidify.com/images/bgImages/VIJAYAWADA.jpg" },
    { name: "Agra", image: "https://www.holidify.com/images/bgImages/AGRA.jpg" },
    { name: "Nashik", image: "https://www.holidify.com/images/bgImages/NASHIK.jpg" },
    { name: "Faridabad", image: "https://www.holidify.com/images/bgImages/FARIDABAD.jpg" },
    { name: "Ghaziabad", image: "https://www.holidify.com/images/bgImages/GHAZIABAD.jpg" },
    { name: "Rajkot", image: "https://www.holidify.com/images/bgImages/RAJKOT.jpg" },
    { name: "Meerut", image: "https://www.holidify.com/images/bgImages/MEERUT.jpg" },
    { name: "Jabalpur", image: "https://www.holidify.com/images/bgImages/JABALPUR.jpg" },
    { name: "Jodhpur", image: "https://www.holidify.com/images/bgImages/JODHPUR.jpg" },
    { name: "Amritsar", image: "https://www.holidify.com/images/bgImages/AMRITSAR.jpg" },
    { name: "Allahabad", image: "https://www.holidify.com/images/bgImages/ALLAHABAD.jpg" },
    { name: "Ranchi", image: "https://www.holidify.com/images/bgImages/RANCHI.jpg" },
    { name: "Dehradun", image: "https://www.holidify.com/images/bgImages/DEHRADUN.jpg" },
    { name: "Jammu", image: "https://www.holidify.com/images/bgImages/JAMMU.jpg" },
    { name: "Udaipur", image: "https://www.holidify.com/images/bgImages/UDAIPUR.jpg" },
    { name: "Bhubaneswar", image: "https://www.holidify.com/images/bgImages/BHUBANESWAR.jpg" },
    { name: "Coorg", image: "https://www.holidify.com/images/bgImages/COORG.jpg" },
    { name: "Pondicherry", image: "https://www.holidify.com/images/bgImages/PONDICHERRY.jpg" },
    { name: "Shimla", image: "https://www.holidify.com/images/bgImages/SHIMLA.jpg" },


    { name: "Goa", image: "https://www.holidify.com/images/bgImages/GOA.jpg" },


    
  ];

  return (
    <section className="bg-[#5D576F] py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-white text-center mb-10">Explore Top Cities</h2>

      <div
        className="flex gap-6 overflow-x-auto scrollbar-hide py-4 cursor-grab"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {/* Group cities in batches of 6 (3x2 grid) */}
        {Array.from({ length: Math.ceil(cities.length / 6) }).map((_, batchIndex) => (
          <div
            key={batchIndex}
            className="grid grid-cols-3 grid-rows-2 gap-6 flex-shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            {cities.slice(batchIndex * 6, batchIndex * 6 + 6).map((city, index) => (
              <div
                key={index}
                onClick={() => navigate(`/city/${city.name}`)}
                className="relative w-80 h-64 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-50 transition duration-300" />
                <h3 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xl font-semibold drop-shadow">
                  {city.name}
                </h3>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCities;
