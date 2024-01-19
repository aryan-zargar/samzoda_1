import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import moment from 'jalali-moment';
import axios from 'axios';
export default function Addworklist() {
    var [d,setd] = useState([])
    var currentDate = new Date()
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    const convertedDate = moment(formattedCurrentDate, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');
    async function handlesubmit(e){
        e.preventDefault()
        console.log(e.target.esti.value)
        var data = {
            date:e.target.date.value,
            title:e.target.code.value,
            prio:e.target.prio.value,
            stat:"0",
            from:e.target.esti.value,
            to:e.target.to.value,
            spen:"-",
            frome:"",
            toe:"",
            done:false,
            user:localStorage.username
        }
        axios.post("http://localhost:8184/work/",data)
        .catch(e=>alert(e))
        window.location="../../worklist"
    }
    async function getact(){
        var res = await axios.get(`http://localhost:8184/worklist?user=${localStorage.username}`)
        setd(res.data)
    }
    useEffect(()=>{
        getact();
    },[])
  return (
    <div className='container'>
        <div className='row' style={{direction:"rtl"}}>
            <Sidebar/>
            <div className='col-md-8 mt-3 ' style={{"border":"solid 1px white","borderRadius":"9px"}}>
            <div className='d-flex justify-content-center' >
                
                <form onSubmit={(e)=>{handlesubmit(e)}} className='w-75 form-group d-flex justify-content-center' style={{"border":"0px solid black",borderRadius:"20px",marginTop:"25px","direction":"rtl","fontSize":"large","paddingTop":"2rem"}}>
                    <div className='p-4 w-100'>
                        <div className='d-flex justify-content-center pb-3'>
                            <h2 style={{"color":"#00ab41"}}>ثبت لیست برنامه </h2>
                        </div>
                        <div className='d-flex'>
                            <div className='mt-3 float-start p-2 w-50'>
                            <label className='p-1' style={{color:"#00ab41",}}> 
                            تاریخ برنامه(شمسی)   
                            </label> 
                            <input defaultValue={convertedDate} name='date' id='date' type='date' className='form-control bg-dark border border-light text-light bg-dark' />
                            </div> 
                            <div className='mt-3 float-end p-2 w-50'>
                            <label className='p-1' style={{color:"#00ab41",}}> 
                                 کار  
                            </label> 
                            <select name='code' id='code' className='form-select bg-dark border border-light text-light bg-dark'>
                                {d.map(e=>{
                                    return(
                                        <option value={e.title}>{e.title}</option>
                                    )
                                })}
                            </select>
                            </div>
                        </div> 
                        <div className='d-flex '>
                            <div className='mt-3 float-end p-2 w-50'>
                                <label className='p-1' style={{color:"#00ab41",}}> 
                                    از (ساعت)
                                </label> 
                                <input name='esti' id='esti' type='time' className='form-control bg-dark border border-light text-light bg-dark'/>
                            </div>
                            <div className='mt-3 float-end p-2 w-50'>
                                <label className='p-1' style={{color:"#00ab41",}}> 
                                    تا (ساعت)
                                </label> 
                                <input name='to' id='to' type='time' className='form-control bg-dark border border-light text-light bg-dark'/>
                            </div>
                        </div>
                        <div className='d-flex'>
                        <div className='mt-3 float-end p-2 w-100'>
                                <label className='p-1' style={{color:"#00ab41",}}> 
                                    اولویت
                                </label> 
                                <select name='prio' id='prio' className='form-select bg-dark border border-light text-light bg-dark'>
                                    <option value={"h"}>بالا</option>
                                    <option value={"l"}>پایین</option>
                                </select>
                            </div>
                        </div>
                            
                        <button style={{"background":"#00ab41",fontWeight:"bolder"}} className='btn btn-hover w-100 mt-3'  type='submit'>ثبت</button>
                    </div>
                    
                </form>
            </div>
            <div className='d-flex justify-content-center '>
                
            </div>
            </div>
        </div>
    </div>
  )
}
