import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsHouseDoorFill } from 'react-icons/bs'; // Import the home icon

const ActivityForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    activity: 'chill', // Default activity
    hours: 0, // Default hours
  });

  // State to hold existing activity data
  const [activityData, setActivityData] = useState([]);

  // useEffect to fetch existing activity data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8184/day?active=true');
        const existingActivityData = response.data || [];

        setActivityData(existingActivityData.length > 0 ? existingActivityData[0] : []);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(activityData);
      const updatedActivityData = [...activityData.activity, { activity: formData.activity, hours: formData.hours }];

      await axios.patch(`http://localhost:8184/day/${activityData.id}/`, {
        activity: updatedActivityData,
      });

      // Reset the form after successful submission
      setFormData({
        activity: 'chill',
        hours: 0,
      });

      // Update local state with the new activity data
      setActivityData(updatedActivityData);

      console.log('Activity data updated successfully!');
    } catch (error) {
      console.error('Error updating activity data:', error);
    }
  };

  return (
    <div className='container d-flex justify-content-center mt-5'>
      <div className='card bg-dark w-50 text-light'>
        <div className='card-header'>
        <div className='d-flex justify-content-between align-items-center'>
        <h2 className='text-light'>Add Activity</h2>
        <button
          className='btn btn-link text-light'
          onClick={() => window.location="/../../"}
          style={{ fontSize: '1.5rem' }}
        >
          <BsHouseDoorFill color='#00ab41' size={24} />
        </button>
      </div>
        </div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='activity' className='form-label'>
                Activity
              </label>
              <select
                className='form-select bg-dark text-light'
                id='activity'
                name='activity'
                value={formData.activity}
                onChange={handleChange}
              >
                <option value='استراحت'>استراحت</option>
                <option value='درس'>درس</option>
                <option value='مطالعه'>مطالعه</option>
                <option value='بازی'>بازی</option>
                <option value='تماشای تلویزیون'>تماشای تلویزیون</option>
                <option value='کار'>کار</option>
                <option value='غذا و نماز'>غذا و نماز</option>
                <option value='دیگر'>دیگر</option>
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='hours' className='form-label'>
                Hours (ساعت)
              </label>
              <input
                type='number'
                className='form-control bg-dark text-light'
                id='hours'
                name='hours'
                value={formData.hours}
                onChange={handleChange}
              />
            </div>
            <button type='submit' className='btn btn-primary w-100' style={{ backgroundColor: '#00ab41',border:"solid 1px #00ab41" }}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActivityForm;
