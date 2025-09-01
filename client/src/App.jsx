
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

// 👇 naya import
import Discover from './pages/Discover';
import About from './pages/About';   // 👈 About page import
import Contact from './pages/Contact';

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
        <Route path='/discover' element={<Discover />} />   {/* 👈 discover route */}
        <Route path='/about' element={<About />} />         {/* 👈 about route */}
         <Route path='/contact' element={<Contact />} />   

        {/* user routing */}
        <Route path="/user" element={<UserRoutes/>}>
          <Route index element={<UserDashboard />}/>   {/* index = default route */}
          <Route path="your-order" element={<YourOrder />} />
        </Route>

        {/* admin routing */}
        <Route path="/admin" element={<AdminRoues/>}>
          <Route index element={<Dashboard/> } />
          <Route path="details" element={<Details />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="all-post" element={<AllPost/>} />
        </Route>

      </Routes>
      <Advertisement/>
      <Footer/>
    </>
  )
}

export default App
