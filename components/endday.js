import { FaPowerOff } from 'react-icons/fa';
import { useEffect, useState } from "react";
import "./style/items.css"

const EndOfDayItem = () => {
    const [getdata, setGetData] = useState(null);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Send GET request to get active data
          const response = await fetch(`http://localhost:8184/day?active=true&user=${localStorage.username}`);
          const data = await response.json();
  
          // Set the first active data in the state
          if (data && data.length > 0) {
            setGetData(data[0]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();

    }, []); // Run the effect only once when the component mounts
  
    const handleEndOfDay = async () => {
      try {
        // Check if there is active data
        if (getdata) {
          // Check if a day record with the same date as today already exists
          const currentDate = new Date();
          const formattedCurrentDate = currentDate.toISOString().split('T')[0];
  
          const checkResponse = await fetch(`http://localhost:8184/day?date=${formattedCurrentDate}&user=${localStorage.username}`);
          const existingData = await checkResponse.json();
  
          if (existingData && existingData.length > 0) {
            // Day record with the same date already exists, show an alert
            window.alert('روزی با همین تاریخ وجود دارد باید یک روز صبر کنید');
            return;
          }
  
          // Send PATCH request to deactivate the data
          await fetch(`http://localhost:8184/day/${getdata.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ active: false }),
          });
  
          // Optional: You can update the state or perform additional actions after deactivating
          // setGetData(null);
  
          // Send POST request to create a new record
          const newRecord = {
            date: formattedCurrentDate, // Get date without hours
            active: true,
            activity: [],
            user:localStorage.username
          };
  
          await fetch('http://localhost:8184/day/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecord),
          });
        }
        else{
          const currentDate = new Date();
          const formattedCurrentDate = currentDate.toISOString().split('T')[0];
  
          const checkResponse = await fetch(`http://localhost:8184/day?date=${formattedCurrentDate}&user=${localStorage.username}`);
          const existingData = await checkResponse.json();
          const newRecord = {
            date: formattedCurrentDate, // Get date without hours
            active: true,
            activity: [],
            user:localStorage.username
          };
  
          await fetch('http://localhost:8184/day/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecord),
          });
        }
      } catch (error) {
        console.error('Error updating/creating data:', error);
      }
      window.location = "../.."
    }
  
    return (
      <div id='item' className='d-flex mt-2'>

        <FaPowerOff size={40} color='#00ab41' className='p-2' onClick={handleEndOfDay} style={{ cursor: 'pointer' }} />
        <button className='btn btn-hover' onClick={handleEndOfDay}>
          <span style={{ color: 'whitesmoke', textDecoration: 'none' }}>اتمام/شروع روز</span>
        </button>
      </div>
    );
  };
  
  export default EndOfDayItem;
  