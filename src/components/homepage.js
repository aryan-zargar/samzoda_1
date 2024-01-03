// Home.js
import React from 'react';
import TodoListWidget from './TodoListWidget';
import AddActivityOption from './addactivityoption'; // Update the import
import EndOfDayItem from './endday';
import ActivityTable from './table';
import { FaDoorOpen } from 'react-icons/fa';
import LogoutButton from './logout';
import MyChartComponent from './chartCompo';
import ChartCompo from './chartCompo';

const Home = () => {
  const username = localStorage.getItem('username');
  if (!username) {
    window.location.href = '../auth';
    return null;
  }

  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-md-8'>
          <div className='card bg-dark text-white'>
            <div className='card-header d-flex justify-content-between align-items-center'>
              <h4>لیست کار</h4>
              <a href='../../Todo' style={{ color: '#00ab41', textDecoration: 'none' }}>
                نمایش همه
              </a>
              
            </div>
            <div className='card-body'>
              <TodoListWidget />
            </div>
          </div>
          <div className='card bg-dark text-white'>
            <div className='card-header d-flex justify-content-between align-items-center'>
              <h4>فعالیت های امروز</h4>
            </div>
            <div className='card-body'>
              <ActivityTable/>
            </div>
          </div>
          <div className='card bg-dark text-white'>
            <div className='card-header d-flex justify-content-between align-items-center'>
              <h4>فعالیت های یک ماه گذشته</h4>
            </div>
            <div className='card-body'>
            <ChartCompo/>
            </div>
          </div>
        </div>
        <div className='col-md-4 mt-3'>
          <div className='card bg-dark text-white' style={{ borderColor: '#00ab41' }}>
            <div className='card-header d-flex justify-content-between align-items-center'>
              <img width={50} height={50} src={require('./images/logo.png')} alt='Logo' />
              <LogoutButton />
            </div>
            <div className='card-body text-center'>
              <h4>سم زدا</h4>
              <p style={{ fontSize: 'small' }}>سامانه مدیریت زمان دانش آموزی</p>
              <hr style={{ backgroundColor: '#00ab41' }} />
              {/* Existing Todo option */}
              <div className='d-flex mt-2'>
                <img src={require('./images/Todo.png')} width={45} height={45} className='p-2' alt='Todo Icon' />
                <button className='btn btn-hover'>
                  <a href='../addtodo' style={{ color: 'whitesmoke', textDecoration: 'none' }}>
                    اضافه کردن کار
                  </a>
                </button>
              </div>
              {/* New option: AddActivityOption */}
              <AddActivityOption />
              <EndOfDayItem/>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
