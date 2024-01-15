import React from 'react'
import LogoutButton from './logout'
import { FaAccusoft, FaBacon, FaCalendar, FaCalendarAlt, FaCalendarCheck, FaCalendarPlus, FaCalendarTimes, FaClipboardCheck, FaClipboardList, FaCloudDownloadAlt, FaCloudMoon, FaDollyFlatbed, FaEnvelopeOpen, FaEnvelopeOpenText, FaFolder, FaFolderPlus, FaGoogleDrive, FaLiraSign, FaList, FaListOl, FaListUl, FaPaperPlane, FaPlusCircle, FaRegCalendarCheck, FaRegCalendarPlus, FaSearchPlus } from 'react-icons/fa'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import './style/items.css'
export default function Sidebar() {
  return (
      <div className='col-md-4 mt-3'>
          <div className='ps-3 pe-3 pt-3 bg-dark text-white' style={{border:'solid 1px',borderRadius:"9px", borderColor: '#00ab41',height:"38.5rem" }}>
            <div className=' d-flex justify-content-between align-items-center'>
              <img onClick={()=>{window.location="../../../../../../../"}} width={50} height={50} src={require('./images/logo.png')} alt='Logo' />
              <LogoutButton />
            </div>
            <div className=' text-center'>
              <h4>سم زدا</h4>
              <p style={{ fontSize: 'small' }}>سامانه مدیریت زمان دانش آموزی</p>
              <hr style={{ backgroundColor: '#00ab41' }} />
              <div id='item'  className='d-flex mt-2'>
                <FaFolderPlus size={40} color='#00ab41' className='p-2' onClick={()=>{window.location="../addactivitylist"}} style={{ cursor: 'pointer' }} />
                <button className='btn btn-hover' onClick={(e)=>{window.location="../addactivitylist"}}>
                  <span style={{ color: 'whitesmoke', textDecoration: 'none' }}> ثبت لیست کار جدید</span>
                </button>
              </div>  
              <div id='item'  className='d-flex mt-2'>
                <FaFolder size={40} color='#00ab41' className='p-2' onClick={()=>{window.location="../activitylist"}} style={{ cursor: 'pointer' }} />
                <button className='btn btn-hover' onClick={(e)=>{window.location="../activitylist"}}>
                  <span style={{ color: 'whitesmoke', textDecoration: 'none' }}>لیست کار</span>
                </button>
              </div>  
              <div id='item'  className='d-flex mt-2'>
                <FaRegCalendarPlus size={40} color='#00ab41' className='p-2' onClick={()=>{window.location="../addworklist"}} style={{ cursor: 'pointer' }} />
                <button className='btn btn-hover' onClick={(e)=>{window.location="../addworklist"}}>
                  <span style={{ color: 'whitesmoke', textDecoration: 'none' }}>ثبت برنامه ریزی جدید</span>
                </button>
              </div>  
              <div id='item'  className='d-flex mt-2'>
                <FaCalendarAlt size={40} color='#00ab41' className='p-2' onClick={()=>{window.location="../worklist"}} style={{ cursor: 'pointer' }} />
                <button className='btn btn-hover' onClick={(e)=>{window.location="../worklist"}}>
                  <span style={{ color: 'whitesmoke', textDecoration: 'none' }}>برنامه ریزی</span>
                </button>
              </div>  
            </div>
          </div>
        </div>
  )
}
