import axios from 'axios'
import React from 'react'

export default function Addactivitylist() {
    
    async function handlesubmit(e){
        e.preventDefault()
        var a = {
            code:e.target.code.value,
            user:localStorage.username,
            title:e.target.title.value
        }
        console.log(a)
        await axios.post("http://localhost:8184/worklist/",a)
        .catch(e=>alert(e))
        window.location="../addactivitylist"
    }
  return (
    <div className='d-flex justify-content-center'>
        <form onSubmit={(e)=>handlesubmit(e)} className='w-50 form-group d-flex justify-content-center' style={{"border":"0px solid black",borderRadius:"20px",backgroundColor:"black",marginTop:"125px","direction":"rtl","fontSize":"large"}}>
            <div className='p-4 w-75'>
                <div className='d-flex justify-content-center pb-3'>
                    <h2 style={{"color":"#00ab41"}}>ثبت عنوان لیست کار</h2>
                </div>
               <div>
                    <label className='p-1' style={{color:"#00ab41",}}> 
                    عنوان کار  
                    </label> 
                    <input name='title' id='title' className='form-control bg-dark border border-dark text-light' />
               </div> 
               <div className='mt-4'>
                    <label className='p-1' style={{color:"#00ab41",}}> 
                    کد کار  
                    </label> 
                    <p className='text-success  ' style={{"fontSize":"medium"}}>برای مثال کد کار با عنوان بازی : BZI</p>
                    <input name='code' id='code' placeholder='برای مثال کد کار بازی : BZI' className='form-control bg-dark border border-dark text-light' />
               </div> 
               <div className='mt-4 w-100'>
                <button className='btn w-100' style={{"backgroundColor":"#00ab41","fontSize":"large"}} type='submit '>ثبت نهایی</button>
               </div>
            </div>
        </form>
    </div>
  )
}
