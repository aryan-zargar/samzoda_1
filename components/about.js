import React from 'react'
import { FaHome } from 'react-icons/fa'
import './style/about.css'
export default function About() {
  return (
    <div className='d-flex justify-content-center'>
        <div className='text-light'style={{"marginTop":"150px"}}>
            <div className='d-flex justify-content-center'>
                <FaHome id='llolk' onHo onClick={()=>window.location="../.."} color='#00ab41'/>
            </div>
            <div className='d-flex justify-content-center'>
                <h3>سم زدا</h3>
            </div>
            <div className='d-flex justify-content-center'>
                <div>
                <p>
                    سامانه مدیریت زمان دانش آموزی یا همان سم زدا ایده ای بود
                </p>
                <p>
                    که به کمک کمی خلاقیت و بهره گیری از سیستم سی آر اِم یا همان
                </p>
                <p>
                    مدیریت ارتباط با مشتری این ایده به ذهنم رسید و در تاریخ 2 دی 1402
                </p>
                <p>
                    به فکر پیاده سازی این سیستم افتادم
                </p>
                <p>
                    و تصمیم گرفتم این برنامه را با کمک جاوا اسکریپت/ری اکت پیاده سازی کنم
                </p>
                
                <hr/>
                <h2>
                    tech stack / تکنولوژی استک
                </h2>
                <p>
                json server     این برنامه از ری اکت برای کلاینت ساید و 
                </p>
                <p>
                    برای ذخیره سازی اطلاعات و سرور ساید استفاده میکند
                </p>

                <hr></hr>
                <p>
                    طراحی و پیاده سازی » آرین زرگر
                </p>
                <p>
                    طراحی لوگو و ایکون » آریا عسگری
                </p>
                <p>
                    جشنواره ی خوازمی سال 1402...
                </p>
                </div>
            </div>
        </div>
    </div>
  )
}
