// AddActivityOption.js
import React from 'react';
import "./style/items.css"

const AddActivityOption = () => {
  return (
    <div id='item' className='d-flex mt-2'>
      <img src={require('./images/activity.png')} width={45} height={45} className='p-2' alt='Add Activity Icon' />
      <button className='btn btn-hover'>
        <a href='../addactivity' style={{ color: 'whitesmoke', textDecoration: 'none' }}>
          اضافه کردن فعالیت
        </a>
      </button>
    </div>
  );
};

export default AddActivityOption;
