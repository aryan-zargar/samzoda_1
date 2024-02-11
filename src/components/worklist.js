import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import Sidebar from './sidebar'

export default function Worklist() {
    var [d,setd] = useState([])
    var [data,setdata] = useState([])
    async function fetchWorkList(){
        const currentDate = new Date();
        const l = currentDate.toISOString().split('T')[0];
        // const convertedDate = moment(l, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');
        var res = await axios.get(`http://localhost:8184/work?user=${localStorage.username}`)
        setdata(res.data)
    }
    function handledelete(id){
        axios.delete(`http://localhost:8184/work/${id}`)
        window.location="../worklist"
    }
    async function getact(){
        var res = await axios.get(`http://localhost:8184/worklist?user=${localStorage.username}`)
        setd(res.data)
    }
    async function handlechange(w){
        if (w != ""){
            var res = await axios.get(`http://localhost:8184/work?user=${localStorage.username}&title=${w}`)
        }
        else{
            var res = await axios.get(`http://localhost:8184/work?user=${localStorage.username}`)
        }
            setdata(res.data)
    }
    useEffect(()=>{
        fetchWorkList();
        getact();
    },[])
  return (
    <div className='container-fluid ps-5 pe-5'>
    <div className='row' style={{"direction":"rtl"}}>
        <Sidebar/>
    <div className='col-md-8 ps-3 pe-3 mt-3 pt-5' style={{"border":"solid 1px white",borderRadius:"9px"}}>
    <div className='mt-1'>
                <button className='btn btn-secondary ' style={{"borderRadius":"25px" , fontSize:"large",fontWeight:""}} onClick={()=>window.location="../../addworklist"}>اضافه کردن +</button>
    </div>
        <label className='float-end text-light mt-1'>جستجو و کار</label>
        <select onChange={(e)=>handlechange(e.target.value)}  name='code' id='code' className='form-select bg-dark border border-light text-light bg-dark'>
            <option value={""}>---</option>
            {d.map(e=>{
                return(
                    <option value={e.title}>{e.title}</option>
                )
            })}
        </select>      
        <table className='table table-bordered table-hover table-dark table-striped mt-1 w-100'>
        <thead>
            <tr>
                <th style={{"textAlign":"center"}}>تاریخ</th>
                <th style={{"textAlign":"center"}}>کار</th>
                <th style={{"textAlign":"center"}}>از (ساعت)</th>
                <th style={{"textAlign":"center"}}>تا (ساعت)</th>
                <th style={{"textAlign":"center"}}>اولویت</th>
                <th style={{"textAlign":"center"}}>وضعیت</th>
                <th style={{"textAlign":"center"}}>از (ساعت واقعی)</th>
                <th style={{"textAlign":"center"}}>تا (ساعت واقعی)</th>
                <th style={{"textAlign":"center"}}>زمان(ساعت)</th>
                <th style={{"textAlign":"center"}}>حذف</th>
                <th style={{"textAlign":"center"}}>انجام</th>

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

                if(e.stat == "0"){
                    sta = "انجام نشده"
                }
                else if(e.stat == "1"){
                    sta="انجام شده"
                }
                return(
                    <tr>
                        <td style={{"textAlign":"center"}}>{e.date}</td>
                        <td style={{"textAlign":"center"}}>{e.title}</td>
                        <td style={{"textAlign":"center"}}>{e.from}</td>
                        <td style={{"textAlign":"center"}}>{e.to}</td>
                        <td style={{"textAlign":"center"}}>{es}</td>
                        <td style={{"textAlign":"center"}}>{sta}</td>
                        <td style={{"textAlign":"center"}}>{e.frome}</td>
                        <td style={{"textAlign":"center"}}>{e.toe}</td>
                        <td style={{"textAlign":"center"}}>{e.spen}</td>
                        <td style={{"textAlign":"center"}}><button onClick={()=>{handledelete(e.id)}} className='btn btn-danger'>-</button></td>
                        <td style={{"textAlign":"center"}}><button disabled={e.done} onClick={()=>{window.location=`../donework/${e.id}`}} className='btn btn-success'>✅</button></td>
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
