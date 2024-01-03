import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'jalali-moment';
const ActivityTable = () => {
  const [activityData, setActivityData] = useState([]);
  const [acti,setacti] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8184/day?active=true');
        const data = response.data[0];
        const l = (response.data[0].date)
        const convertedDate = moment(l, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');
        setacti(convertedDate)
        // console.log(new Intl.DateTimeFormat('fa-u-ca-persian', { dateStyle: 'full' }).format(acti))
        setActivityData(data.activity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="container mt-4">
        <h4>{acti}</h4>
      <table className="table table-dark table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>فعالیت</th>
            <th>ساعت</th>
          </tr>
        </thead>
        <tbody>
          {activityData.map((activity, index) => {
            if(index <= 10){
                return(
                    <tr >
                      <td>{activity.activity}</td>
                      <td>{activity.hours}</td>
                    </tr>
                  )
            }
            
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
