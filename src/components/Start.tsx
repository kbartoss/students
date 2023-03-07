import React from 'react'
import startImg from '../img/start-img.png'

const Start = () => {
  return (
    <div className='start'>
      <img src={startImg} alt="" className='start__img'/>
      <h1 className="start__text">Witamy w panelu administratora.</h1>
    </div>
  )
}

export default Start