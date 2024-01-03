import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function ChartCompo() {
    var [data,setdata] = useState([])
    var [fdata,setfdata] = useState([])
    var [actdata,setactdata] = useState([])
    var [values,setvalues] = useState([])
    var [names,setnames] = useState([])
    async function fetch(){
        const apiUrl = `http://localhost:8184/day?user=${localStorage.username}`;
        
        await axios.get(apiUrl)
        .then(response => {
        console.log(response.data)
        data = (response.data)
        })
    .catch(error => {
      // Handle errors here
      console.error('Error fetching data:', error);
    });
        if(data.length > 30){
            for (let index = data.length; index > data.length-30; index--) {
                const element = data[index];
                fdata = ([...fdata,element])
            }
        }
        else{
            fdata = ([...data])
        }
        actdata = []
        fdata.forEach(element => {
            actdata = ([...actdata,element.activity])
        });
        
    }
    async function doIT() {
        let newValues = [];
        let newNames = [];
    
        for (let index = 0; index < actdata.length; index++) {
            const element = actdata[index];
            for (let index = 0; index < element.length; index++) {
                const felemnt = element[index];
                newValues.push(Number(felemnt.hours));
                newNames.push(felemnt.activity);
            }
        }
    
        for (let index = 0; index < newNames.length; index++) {
            const element = newNames[index];
            for (let index1 = index + 1; index1 < newNames.length; index1++) {
                const flement = newNames[index1];
                if (element === flement) {
                    newNames.splice(index1, 1);
                    newValues[index] += newValues[index1];
                    newValues.splice(index1, 1);
                }
            }
        }
    
        var x = 0;
        for (let index = 0; index < newValues.length; index++) {
            const element = newValues[index];
            x += element;
        }
    
        var numlist = [];
        for (let index = 0; index < newValues.length; index++) {
            const element = newValues[index];
            numlist.push(element * 100 / x);
        }
    
        setvalues(numlist);
        setnames(newNames);
    
        console.log(numlist);
        console.log(newNames);
    }
    
    useEffect(() => {
        const intervalId = setInterval(fetch, 3000);
        const intervalid2 = setInterval(doIT, 3000);

        return () => {
            clearInterval(intervalId);
            clearInterval(intervalid2)
        }
      }, []);
  return (
    <table className='table table-bordered table-striped table-dark table-hover'>
        <thead>
            <tr>
                {names.map(e=>{
                    return(
                        <th>{e}(درصد)</th>
                    )
                })}
            </tr>
        </thead>
        <tbody>
            <tr>
            {values.map(e=>{
                return(
                  <td>{Math.round(e)}</td>  
                )
            })}
            </tr>
        </tbody>
    </table>
  )
}
