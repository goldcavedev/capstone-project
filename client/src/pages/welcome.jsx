import React, { useState, useEffect } from 'react';
import Carousel from '../components/carousel';
import LatestVideo from '../components/lastvideo';
import MyNavBar from '../components/navbar';
import MyFooter from '../components/footer';
import '../style/welcome.css';


const Home = () => {
  
  const playlistId = 'PLbh61rYtHigbMBgeoVrsm_afYEcaPK1Un';
  
  return (
    <>
    <MyNavBar />
      <Carousel />
      <div className="welcome-page" style={{ color: 'white', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <h2>Indie Games for everyone!</h2>
        <p>Discover daily indie's pearls in the world of gaming</p>
      </div>
      <LatestVideo playlistId={playlistId}/>
      <MyFooter />
    </>
  );
}

export default Home;
