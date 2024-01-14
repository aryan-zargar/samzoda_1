import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { BsHouseDoorFill } from 'react-icons/bs';

export default function TodoForm() {
  const [formData, setFormData] = useState({
    title: '',
    active: true,
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'active' ? value === 'true' : value,
    });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the user field to the formData
      const updatedFormData = {
        ...formData,
        user: localStorage.getItem('username'),
      };

      await axios.post('http://localhost:8184/Todo', updatedFormData);
      console.log('Todo added successfully!');
      history.push('../../..');
    } catch (error) {
      alert('Error adding todo:', error);
    }
    window.location="../.."
  };

  return (
    <div className='container mt-5 w-25' style={{ backgroundColor: '#0A0A0A', padding: '20px', borderRadius: '10px' }}>
      <div className='d-flex justify-content-between align-items-center'>
        <h2 className='text-light'>Add Todo</h2>
        <button
          className='btn btn-link text-light'
          onClick={() => window.location="/../../"}
          style={{ fontSize: '1.5rem' }}
        >
          <BsHouseDoorFill color='#00ab41' size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className='text-light'>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control form-control-sm bg-dark text-light'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='active' className='form-label'>
            Active
          </label>
          <select
            className='form-select form-select-sm bg-dark text-light'
            id='active'
            name='active'
            value={formData.active.toString()}
            onChange={handleChange}
            required
          >
            <option value='true'>Active</option>
            <option value='false'>Inactive</option>
          </select>
        </div>
        <button type='submit' className='btn btn-primary w-100' style={{ backgroundColor: '#00ab41' }}>
          Add Todo
        </button>
      </form>
    </div>
  );
}
