import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from "./pages/Home";
import Register from './pages/register'
import Login from './pages/login';
import Contact from './pages/contact';
import Create from './pages/create';
import UserProfile from './pages/userProfile';
import UploadProfileImage from './pages/uploadProfileImage'
import ChangePassword from './pages/ChangePassword';
import Navbar from './components/navbar'
import Blog from './components/blog';
import Messages from './pages/Messages';
import ManageBlogs from './pages/ManageBlogs';
import "./index.css"

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return <>
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/create' element={<Create />} />
        <Route path="/profile" element={<UserProfile setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/changeImage" element={<UploadProfileImage />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/manageBlogs" element={<ManageBlogs />} />
      </Routes>

    </BrowserRouter>
  </>
}

export default App;
