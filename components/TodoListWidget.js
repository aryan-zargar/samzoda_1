import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoListWidget = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const fetchTodoList = async () => {
    try {
      const username = localStorage.username;
      const response = await axios.get(`http://localhost:8184/Todo?user=${username}&active=true`);
      setData(response.data);
    } catch (error) {
      setError('Error fetching Todo list');
    }
  };

  useEffect(() => {
    fetchTodoList();  
  }, []); // Fetch Todo list on component mount
  function deleterecord(id){
    axios.delete(`http://localhost:8184/Todo/${id}`)
    window.location="../../"
  }
  function end(id){
    axios.patch(`http://localhost:8184/Todo/${id}`,{active:false})
    window.location="../.."
  }
  return (
    <div className='mt-3'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table className='table table-hover table-striped table-bordered table-dark w-100'>
        <thead>
          <tr>
            <th className='d-flex justify-content-center'>تیتر</th>
            <th style={{ width: '10%' }}>وضعیت</th>
            <th style={{ width: '10%' }}>اتمام</th>
            <th style={{ width: '10%' }}>حذف</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e,index) => {if(index <= 3){return(
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>{e.active ? 'فعال' : 'اتمام'}</td>
              <td>
                <button onClick={()=>{end(e.id)}} className='btn btn-success'>✅</button>
              </td>
              <td>
                <button onClick={()=>{deleterecord(e.id)}} className='btn btn-danger'>❌</button>
              </td>
            </tr>
          )}})}
        </tbody>
      </table>
    </div>
  );
};

export default TodoListWidget;
