import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import axios from 'axios';
import moment from 'jalali-moment';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export default function MonthChart() {
    var [data, setdata] = useState([]);
    var [nd, setnd] = useState("");
    var [exms,setexms] = useState([])
    var [scanEXM,setScanEXM] = useState([])
    var [worklist,setworklist] = useState([])
    var [hoursum,sethoursum] = useState(0)
    var [prece,setprece] = useState(0)
    var [sesum,setsesum] = useState(0)
    async function randomWait() {
        await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 100)));

        return;
    }

    useEffect(() => {
        async function fetchData() {
            var response = await axios.get(`http://localhost:8184/work?user=${localStorage.username}`);
            setdata(response.data);
            response = await axios.get(`http://localhost:8184/worklist?user=${localStorage.username}`)
            setworklist(response.data)
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function doIT() {
            const currentDate = new Date();
            const formattedCurrentDate = currentDate.toISOString().split('T')[0];
            const convertedDate = moment(formattedCurrentDate, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');
            var newdate;
            if (convertedDate.split("-")[1] == "01") {
                newdate = convertedDate;
                var year = `${Number(convertedDate.split("-")[0]) - 1}`;
                var month = "12";
                var day = convertedDate.split("-")[2];
                newdate = `${year}-${month}-${day}`;
                setnd(newdate);
            } else {
                newdate = convertedDate;
                year = convertedDate.split("-")[0];
                month = `${Number(convertedDate.split("-")[1])}`;
                day = convertedDate.split("-")[2];
                newdate = `${year}-${month}-${day}`;
                setnd(newdate);
            }

            var exm = [];
            var month = nd.split("-")[1];
            var day = nd.split("-")[2]
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                await randomWait();
                if ( Number(nd.split("-")[1]) >=  Number(element.date.split("-")[1])&& Number(element.date.split("-")[1]) >= Number(month)-1  ) {
                    console.log((nd) )
                    console.log((element.date)) 
                    exm.push(element);
                }
            }
            await setexms(exm)
            await setScanEXM(exm)
            console.log(exms)
            var sum = 0;
            exm.forEach(element => {
                sum = sum+element.spen
            });
            await sethoursum(sum)
            var res = (await axios.get(`http://localhost:8184/work?user=${localStorage.username}`)).data;
            var se = 0;
            exm.forEach(element => {
                se = se+element.spen
            });
            setsesum(se)
        }

        doIT();
    }, [data,]);
    async function handlechange(e){
        var sum = 0;
        var exm = []
        console.log(exms)
        if(e != ""){
            scanEXM.forEach(element => {
                if((element.title).includes(e)){
                    sum = sum+element.spen
                    exm.push(element)
                }
            });
        }
        else{
            scanEXM.forEach(element => {
                    sum = sum+element.spen
                    exm.push(element)

            });
        }
        sethoursum(sum)
        setexms(exm)
        setprece((sum*100)/sesum)
    }
    return (
        <div className='container'>
            <div className='row ' style={{ direction: "rtl" }}>
                <Sidebar />
                <div id='mainpage' className='col-md-8 border mt-3 border-light' style={{ "borderRadius": "9px" }}>
                    <div className='d-flex justify-content-center mt-5'>
                        <h2 style={{"color":"#00ab41"}}>گزارش گیری ماه گذشته</h2>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className='mt-3 float-end p-2 w-50'>
                            <label className='p-1' style={{color:"#00ab41",}}> 
                                 کار  
                            </label> 
                            <select onChange={(a)=>{handlechange(a.target.value)}} name='code' id='code' className='form-select bg-dark border border-light text-light bg-dark'>
                                <option value={""} >-----</option>
                                {worklist.map(e=>{
                                    return(
                                        <option value={e.title}>{e.title}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className='mt-3 text-light d-flex p-2'>
                            <p>  جمع ساعات فعالیت   :    </p>
                        </div>
                        <div className='mt-3 text-light d-flex p-2 '>
                            <p>{hoursum}</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className='mt-3 text-light d-flex p-2'>
                            <p>درصد فعالیت :</p>
                        </div>
                        <div className='mt-3 text-light d-flex p-2 '>
                            <p>{prece}%</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
        <table className='table table-bordered table-hover table-dark table-striped mt-1'>
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

            </tr>
        </thead>
        <tbody>
            {exms.map((e)=>{
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
                    </tr>
                )
            })}
        </tbody>
      </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
