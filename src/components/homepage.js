import React, { useEffect, useState } from 'react';
import { FaDoorOpen, FaList } from 'react-icons/fa';
import LogoutButton from './logout';
import "./style/items.css"
import Addactivitylist from './addactivitylist';
import Sidebar from './sidebar';

const Home = () => {

  function mainpage_activitylist(e,f){
    window.location="../addactivitylist"
  }
  const username = localStorage.getItem('username');
  if (!username) {
    window.location.href = '../auth';
    return null;
  }
  
  
  
  return (
    <div className='container'>
      <div className='row ' style={{direction:"rtl"}} >
        <Sidebar/>
        <div id='mainpage' className='col-md-8 border mt-3 border-light' style={{"borderRadius":"9px"}}>
            
        </div>
      </div>
    </div>
  );
};

export default Home;
