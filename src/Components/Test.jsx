import React from 'react'
import Otp from './Otp'

function Test() {
  return (
    <div>
      <Otp onSubmit={(otp)=>{console.log(otp)}}/>
    </div>
  )
}

export default Test
