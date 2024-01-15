import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import axios from 'axios'

export default function Activitylist() {
    var [data,setdata] = useState([])
    async function fetchActivitylist(){
        var res = await axios.get(`http://localhost:8184/worklist?user=${localStorage.username}`)
        setdata(res.data)
    }   
    function deleteActivity(id){
        axios.delete(`http://localhost:8184/worklist/${id}`)
        window.location="../activitylist"
    }
    useEffect(() => {
        fetchActivitylist();
      }, []);
  return (
    <div className='container'>
      <div className='row' style={{direction:"rtl"}}>
        <Sidebar/>
        <div className='col-md-8 mt-3' style={{"border":"solid 1px white",borderRadius:"9px"}}>
            <div className='mt-5'>
                <button className='btn btn-secondary ' style={{"borderRadius":"25px" , fontSize:"large",fontWeight:""}} onClick={()=>window.location="../../addactivitylist"}>اضافه کردن +</button>
            </div>
            <table className='table table-striped table-hover table-bordered table-dark mt-4'>
                <thead>
                    <tr>
                        <th>عنوان</th>
                        <th>کد</th>
                        <th className='' style={{width:"1rem"}}>حذف</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(e=>{
                        return(
                            <tr>
                                <td>{e.title}</td>
                                <td>{e.code}</td>
                                <td><button onClick={()=>{deleteActivity(e.id)}} className='btn btn-danger'>-</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}
