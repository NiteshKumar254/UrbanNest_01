import logo from "../assets/image1.png";
import logo1 from "../assets/image2.png";

const Footer = () => {
  return (
    <footer className="bg-[#5D576F] py-10 border-t border-gray-200">
      {/* Top Heading */}
      <h2 className="text-3xl font-semibold text-white mt-8 text-center">
        Discover Your Ideal PG with PG Finder
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between mt-12">
        {/* Logo and Tagline */}
        <div className="mb-10 md:mb-0 max-w-sm">
          <div className="flex items-center gap-2">
            <img src={logo1} alt="Logo" className="h-8 w-auto" />
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <h1 className="text-2xl font-semibold text-white">PG Finder</h1>
          </div>
          <p className="text-white mt-3">
            Helping students and working professionals find their second home — with verified listings, affordable prices, and a trusted experience.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-white hover:text-blue-500">About Us</a></li>
              <li><a href="careers" className="text-white hover:text-blue-500">Careers</a></li>
              <li><a href="/blogs" className="text-white hover:text-blue-500">Blog</a></li>
              <li><a href="/partners" className="text-white hover:text-blue-500">Partners</a></li>
              <li><a href="/contact" className="text-white hover:text-blue-500">Contact</a></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Popular Cities
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-blue-500">Delhi</a></li>
              <li><a href="#" className="text-white hover:text-blue-500">Mumbai</a></li>
              <li><a href="#" className="text-white hover:text-blue-500">Bangalore</a></li>
              <li><a href="#" className="text-white hover:text-blue-500">Pune</a></li>
              <li><a href="#" className="text-white hover:text-blue-500">Hyderabad</a></li>
              <li><a href="#" className="text-white hover:underline">See more</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Policies
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-blue-500">Privacy Policy</a></li>
              <li><a href="#" className="text-white hover:text-blue-500">Terms & Conditions</a></li>
              <li><a href="#" className="text-white hover:text-blue-500">Security Guidelines</a></li>
              <li><a href="#" className="text-white hover:text-blue-500">Listing Guidelines</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-blue-500">Help Center</a></li>
              <li><a href="#" className="text-white hover:text-blue-500">Report an Issue</a></li>
              <li><a href="#" className="text-white hover:text-blue-500">FAQs</a></li>
              <li><a href="#" className="text-white hover:text-blue-500">Community Forum</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom (optional) */}
      <div className="mt-12 border-t pt-6 text-center text-sm text-white">
        © {new Date().getFullYear()} PG Finder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
