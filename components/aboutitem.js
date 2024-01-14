import React from 'react'
import { BsFillInfoSquareFill, BsInfo, BsInfoCircleFill } from 'react-icons/bs'
import { FaInfo, FaInfoCircle } from 'react-icons/fa'
import "./style/items.css"
export default function Abitem() {
  return (
    <div id='item' className='d-flex mt-2'>

        <BsFillInfoSquareFill size={40} color='#00ab41'/>
        <button  className='btn btn-hover' onClick={()=>window.location="../info"}>
          <span style={{ color: 'whitesmoke', textDecoration: 'none' }}>درباره ی برنامه</span>
        </button>
      </div>
  )
}
