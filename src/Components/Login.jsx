import React, { useEffect, useState } from 'react';
import Otp from './Otp';
import { Api_Path } from './Link';

function Login() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [useOtp, setUseOtp] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [VerifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [user,setuser]=useState('')

  
const UserLogin=async (e)=>{
      e.preventDefault()
     try{
      const Response=await fetch(`${Api_Path}/otp/Login-password`,{

        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({userName,email,password})
    })
    const Data=await Response.json()
    if(Response.ok){
      console.log("Response : ",Data)
      localStorage.setItem('UserId',Data.user._id)
      localStorage.setItem('UserName',Data.user.userName)
      alert('Login Successful')
      window.location.reload()
    }
    if (!Response.ok) {
      
      if (Response.status === 404 && Data.msg === 'user not Registered')
        alert('User not registered');
      else if (Response.status === 400 && Data.msg === 'incurrect password')
        alert('Incorrect password');
      else
        alert(Data.msg || 'Login failed');
    }
    
     }
     catch(error){
      console.log(error)
     }
}

const LoginOtpGenerator=async ()=>{
    
      try{
        setOtpLoading(true)
        const Response=await fetch(`${Api_Path}/otp/Otp-Login`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({userName,email})
      })
      const Data=await Response.json()
      if(Response.ok){
        console.log("++++====>",Data.user)
        setuser(Data.user.userName)
        setOtpLoading(false)
        alert('otp sent to your email')
        setShowOtpModal(true)
        
      }
     
    }
    catch(error){
      setOtpLoading(false)
      console.log(error)
    }
}



const LoginOtpVerify=async()=>{
  
   try{
    setVerifyOtpLoading(true)
    const Response=await fetch(`${Api_Path}/otp/Otp-verify`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email,otp})
  })
  const Data=await Response.json()
   if(Response.ok){
    setVerifyOtpLoading(false)
    localStorage.setItem('UserId',Data.verifyOtp._id)
    localStorage.setItem('UserName',user)
     alert('Login Successful')
     setShowOtpModal(false)
     window.location.reload()
   }

   }
   catch(error){
    console.log(error)
   }

}

const LoginOtpResend=async ()=>{
      
  try{
    const Response=await fetch(`${Api_Path}/otp/Login/Resend`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email})
  })
  const Data=await Response.json()
   if(Response.ok){
     alert('Otp Resent')
    
   }

  }
  catch(error){
    console.log(error)
  }

}

useEffect(()=>{

  if(otp.length===6 && showOtpModal){
     LoginOtpVerify()
     setShowOtpModal(false)
  }
},[otp])


  return (
    <div className='login'>
      {otpLoading&&<h2>Loading...</h2>}
      <form  onSubmit={UserLogin}>
        <h2>Login</h2>
        <input
          type='text'
          placeholder='Enter username'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type='email'
          placeholder='Enter your email address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className='checkbox-label'>
          <input
            type='checkbox'
            checked={useOtp}
            onChange={() => setUseOtp(!useOtp)}
          />
          Use OTP instead of password
        </label>

        {!useOtp ? (
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        ) : (
          <button type='button' onClick={LoginOtpGenerator} >
            {otpLoading ? 'Sending...' : 'Send OTP'}
          </button>
        )}

        {!useOtp && <button type='submit' >Login</button> }
      </form>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className='modal-backdrop'>
          <div className='modal'>
            <h3>Enter OTP</h3>
            <Otp size={6} setOtp={setOtp} />
            {VerifyOtpLoading && <h3>Verifying...</h3>}
            <div><span>Otp not Received ?</span> <button onClick={LoginOtpResend}> Resend</button> </div>
            <button onClick={() => setShowOtpModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
