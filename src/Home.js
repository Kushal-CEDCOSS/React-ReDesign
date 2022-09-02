import React, { useEffect } from 'react';
import "./Home.css";
import Topbar from './Topbar';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Productsbar from './Productsbar';


const Home = () => {

  useEffect(()=>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className="Home">
        <Topbar />
        <Navbar />
        <div className="row">
        <Sidebar />
        <Productsbar />
        </div>
    </div>
  )
}

export default Home