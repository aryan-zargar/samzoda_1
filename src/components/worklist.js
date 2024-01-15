import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import Sidebar from './sidebar'

export default function Worklist() {
    var [data,setdata] = useState([])
    async function fetchWorkList(){
        var res = await axios.get(`http://localhost:8184/work?user=${localStorage.username}`)
        setdata(res.data)
    }
    useEffect(()=>{
        fetchWorkList();
    },[])
  return (
    <div className='container'>
    <div className='row' style={{"direction":"rtl"}}>
        <Sidebar/>
    <div className='col-md-8 ps-3 pe-3 mt-3 pt-5' style={{"border":"solid 1px white",borderRadius:"9px"}}>
      <table className='table table-bordered table-hover table-dark table-striped'>
        <thead>
            <tr>
                <th>تاریخ</th>
                <th>کار</th>
                <th>تخمین زمانی</th>
                <th>اولویت</th>
                <th>وضعیت</th>
                <th>زمان اصلی(اگر انجام شده نباشد 0 است)</th>
            </tr>
        </thead>
        <tbody>
            {data.map((e)=>{
                var es = null
                var sta = null
                if(e.prio == "h"){
                    es = <FaArrowUp/>
                }
                else{
                    es = <FaArrowDown/> 
                }

                if(e.stat = "0"){
                    sta = "انجام نشده"
                }
                if(e.stat = "1"){
                    sta="انجام شده"
                }
                return(
                    <tr>
                        <td>{e.date}</td>
                        <td>{e.name}</td>
                        <td>{e.esti}</td>
                        <td>{es}</td>
                        <td>{sta}</td>
                        <td>{e.spen}</td>
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
