import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import axios from 'axios';
import moment, { min } from 'jalali-moment';

export default function WeekChart() {
    var [data, setdata] = useState([]);
    var [nd, setnd] = useState("");
    var [exms,setexms] = useState([])
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
            if(Number(convertedDate.split("-")[2]) > 7){
                newdate = convertedDate;
                year = convertedDate.split("-")[0]
                month = convertedDate.split("-")[1]
                day = `${Number(convertedDate.split("-")[2]) -7}`
                newdate = `${year}-${month}-${day}`
            }

            var exm = [];
            var month = newdate.split("-")[1];

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                await randomWait();
                if (Number(element.date.split("-")[1]) > Number(month)) {
                    exm.push(element);
                }
            }
            await setexms(exm)
            console.log(exms)
            var sum = 0;
            data.forEach(element => {
                sum = sum+element.spen
            });
            await sethoursum(sum)
            var res = (await axios.get(`http://localhost:8184/work?user=${localStorage.username}`)).data;
            var se = 0;
            res.forEach(element => {
                se = se+element.spen
            });
            setsesum(se)
        }

        doIT();
    }, [data]);
    async function handlechange(e){
        var sum = 0;
        data.forEach(element => {
            if(e.includes(element.title)){
                sum = sum+element.spen
            }
        });
        sethoursum(sum)
        
        setprece((sum*100)/sesum)
    }
    return (
        <div className='container'>
            <div className='row ' style={{ direction: "rtl" }}>
                <Sidebar />
                <div id='mainpage' className='col-md-8 border mt-3 border-light' style={{ "borderRadius": "9px" }}>
                    <div className='d-flex justify-content-center mt-5'>
                        <h2 style={{"color":"#00ab41"}}>گزارش گیری هفته گذشته</h2>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className='mt-3 float-end p-2 w-50'>
                            <label className='p-1' style={{color:"#00ab41",}}> 
                                 کار  
                            </label> 
                            <select onChange={(e)=>{handlechange(e.target.value)}} name='code' id='code' className='form-select bg-dark border border-light text-light bg-dark'>
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
                </div>
            </div>
        </div>
    );
}
