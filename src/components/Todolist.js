import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
const TodoListWidget = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const fetchTodoList = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await axios.get(`http://localhost:8184/Todo?user=${username}`);
      setData(response.data);
    } catch (error) {
      setError('Error fetching Todo list');
    }
  };
  function handleDone(id){
    axios.patch(`http://localhost:8184/Todo/${id}/`,{active:false})
    window.location="../.."
  }
  useEffect(() => {
    fetchTodoList();
  }, []); // Fetch Todo list on component mount
  function deleterecord(id){
    axios.delete(`http://localhost:8184/Todo/${id}`)
    fetchTodoList();
    window.location="../.."
  }
  return (
    <div className="d-flex justify-content-center">
    <div className='mt-3 w-50'>
      <div className='d-flex justify-content-center text-light'>
        <FaHome onClick={()=>window.location ="../.."} color='green' style={{"width":"50px","height":"50px"}}/>
      </div>
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
                <button onClick={()=>{handleDone(e.id)}} className='btn btn-success'>✅</button>
              </td>
              <td>
                <button onClick={()=>{deleterecord(e.id)}} className='btn btn-danger'>❌</button>
              </td>
            </tr>
          )}})}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default TodoListWidget;
