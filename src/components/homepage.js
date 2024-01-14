import React, { useEffect, useState } from 'react';
import { FaDoorOpen, FaList } from 'react-icons/fa';
import LogoutButton from './logout';
import "./style/items.css"
import Addactivitylist from './addactivitylist';

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
    <div className='container mt-3'>
      <div className='row ' style={{direction:"rtl"}} >
      <div className='col-md-4 mt-3'>
          <div className='card bg-dark text-white' style={{ borderColor: '#00ab41',height:"100%" }}>
            <div className='card-header d-flex justify-content-between align-items-center'>
              <img width={50} height={50} src={require('./images/logo.png')} alt='Logo' />
              <LogoutButton />
            </div>
            <div className='card-body text-center'>
              <h4>سم زدا</h4>
              <p style={{ fontSize: 'small' }}>سامانه مدیریت زمان دانش آموزی</p>
              <hr style={{ backgroundColor: '#00ab41' }} />
              <div id='item'  className='d-flex mt-2'>
                <FaList size={40} color='#00ab41' className='p-2' onClick={()=>{window.location="../addactivitylist"}} style={{ cursor: 'pointer' }} />
                <button className='btn btn-hover' onClick={(e)=>{mainpage_activitylist(e,"<Addactivitylist/>")}}>
                  <span style={{ color: 'whitesmoke', textDecoration: 'none' }}>ثبت لیست کار</span>
                </button>
              </div>  
            </div>
              
                        
            
          </div>
        </div>
        <div id='mainpage' className='col-md-8 border mt-3 border-light' style={{"borderRadius":"9px"}}>
            
        </div>
      </div>
    </div>
  );
};

export default Home;
