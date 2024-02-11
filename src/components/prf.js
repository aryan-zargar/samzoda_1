import React from 'react'
import Sidebar from './sidebar'
import LogoutButton from './logout';
import { FaAd, FaBahai, FaMercury } from 'react-icons/fa';
import axios from 'axios';

export default function Prf() {
    if(!localStorage.username){
        window.location="../../auth"
    }
    var username = localStorage.username;
    async function handleedit(e){
        e.preventDefault();
        if(e.target[0].value == e.target[1].value){
            var a = (await axios.get(`http://localhost:8184/users/?username=${localStorage.username}`)).data
            var id = a[0].id
            axios.patch(`http://localhost:8184/users/${id}`,{password:e.target[0].value})
            e.target[0].value = ""
            e.target[1].value = ""
            alert("موفق")
            window.location="../../profile"
        }
        else{
            alert("password doesn't match")
        }
    }
  return (
    <div className='container' >
      <div className='row ' style={{direction:"rtl"}} >
        <Sidebar/>
        <div id='mainpage' className='col-md-8 border mt-3 border-light text-light ' style={{"borderRadius":"9px"}}>
            <div className='w-100 d-flex justify-content-end p-5'>
                <LogoutButton/>
            </div>
            <div className='w-100 d-flex justify-content-center'>   
                <div className='mt-5'>
                    <h5>نام کاربری</h5>
                    <h5>{username}</h5>
                    <div className='mt-4'>
                        <h4>تغییر رمز عبور</h4>
                        <div className='d-flex justify-content-center mt-2 border border-success' style={{"borderRadius":"8px"}}>
                            <form onSubmit={(e)=>{handleedit(e)}} className='form-gorup p-4'>
                                <label>رمز عبور جدید</label>
                                <input className='form-control bg-dark text-light' style={{"border":"solid 1px whitesmoke"}} />

                                <label className='mt-3'>تکرار رمز عبور</label>
                                <input className='form-control bg-dark text-light' style={{"border":"solid 1px whitesmoke"}} />

                                <button className='btn btn-success w-100 mt-3'>ثبت</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
