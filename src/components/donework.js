import React from 'react'
import Sidebar from './sidebar'
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function Donework() {
    let { id } = useParams();
    function handlesubmit(e){
        e.preventDefault();
        axios.patch(`http://localhost:8184/work/${id}`,{
            frome:e.target.esti.value,
            toe:e.target.to.value,
            spen:Math.abs(e.target.esti.value - e.target.to.value)
        })
        .catch(err=>{
            alert(err)
            window.location = "../worklist"
        })

        alert("succeess")
        window.location= "../worklist"
    }
  return (
    <div className='container'>
        <div className='row' style={{direction:"rtl"}}>
            <Sidebar/>
            <div className='col-md-8 mt-3 ' style={{"border":"solid 1px white","borderRadius":"9px"}}>
            <div className='d-flex justify-content-center' >
                
                <form onSubmit={(e)=>handlesubmit(e)}  className='w-75 form-group d-flex justify-content-center' style={{"border":"0px solid black",borderRadius:"20px",marginTop:"25px","direction":"rtl","fontSize":"large","paddingTop":"2rem"}}>
                    <div className='p-4 w-100'>
                        <div className='d-flex justify-content-center pb-3'>
                            <h2 style={{"color":"#00ab41"}}>خاتمه برنامه </h2>
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
