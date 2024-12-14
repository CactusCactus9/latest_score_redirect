import React from 'react'
import "./Adversaries.css"
import profile from "./logo.png"

const AdversariesBar = () => {
  return (
    <div className='adversaries'>
        <div className='player1'>
            <div className='player1-info'>
                <img src={profile} alt=""></img>
                <h6 className='name'>Player1</h6>
            </div>
            <h4>V</h4>
        </div>
        <div className='player2'>
            <h4>S</h4>
            <div className='player2-info'>
                <h6 className='name'>Player2</h6>
                <img src={profile} alt=""></img>
            </div>
        </div>
        </div>
  )
}

export default AdversariesBar
