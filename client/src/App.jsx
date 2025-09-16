
import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';

import Register from './pages/Register';
import HomePage from './pages/HomePage';
import UserRoutes from './components/routes/Private'
import AdminRoues from './components/routes/Admin';
import UserDashboard from './pages/user/UserDashboard';
import YourOrder from './pages/user/YourOrder';

import Dashboard from './pages/admin/Dashboard';
import CreatePost from './pages/admin/CreatePost';
import CreateCategory from './pages/admin/CreateCategory';
import Advertisement from './components/Advertisement';
import Footer from './components/Footer';
import Details from './pages/admin/Details';
import AllPost from './pages/admin/AllPost';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import SearchPage from './pages/SearchPage';
import TopCities from './pages/TopCities';


import Discover from './pages/Discover';
import About from './pages/About';   
import Contact from './pages/Contact';
import CityPage from './pages/CityPage'; 
import Careers from './components/Careers';  
import CheckoutPage from "./pages/CheckoutPage";
import AllBookings from './pages/admin/AllBookings';
import Notifications from './pages/admin/Notifications';
import Chatbot from './components/Chatbot';




function App() {
  return (
    <> 
      <Navbar/>
      <Routes>
        
        {/* public routes */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/search' element={<SearchPage />} />
        <Route path='/discover' element={<Discover />} />   
        <Route path='/about' element={<About />} />        
         <Route path='/contact' element={<Contact />} />
         <Route path='/topcities' element={<TopCities />} />
         <Route path="/city/:city" element={<CityPage />} />   
        < Route path="/careers" element={<Careers />} />  
        <Route path="/chatbot" element={<Chatbot />} />


        {/* user routing */}
        <Route path="/user" element={<UserRoutes/>}>
          <Route index element={<UserDashboard />}/>   
          <Route path="your-order" element={<YourOrder />} />
        </Route>

        <Route path="/checkout" element={<CheckoutPage />} />

        {/* admin routing */}
        <Route path="/admin" element={<AdminRoues/>}>
          <Route index element={<Dashboard/> } />
          <Route path="details" element={<Details />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="all-post" element={<AllPost/>} />
          <Route path="all-booking" element={<AllBookings />} />
          <Route path="/admin/notifications" element={<Notifications />} />
        </Route>

      </Routes>
          <Advertisement />
        <Footer />
    
    </>
  )
}

export default App;
