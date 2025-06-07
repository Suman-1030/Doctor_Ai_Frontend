import React, { useEffect, useState } from 'react';
import Otp from './Otp'; // Adjust path as needed
import Nav from './Nav';
import { Api_Path } from './Link';
import { redirect } from 'react-router-dom';

function Register({Loginhandler,Registerhandler}) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [useOtp, setUseOtp] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [Loading,setLoading]=useState(false)
  const [otpLoading,setotpLoading]=useState(false)

 const OtpVerify= async (req,res)=>{

     try{
      setLoading(true)
    console.log({ userName, email, otp });  
    console.log(otp.length) 
    const Response=await fetch(`${Api_Path}/otp/Otpver`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({userName,email,Otp:otp})     
   })
   const Data = await Response.json()
     if(Response.ok){
        setLoading(false)
        alert('Registered successful')
        console.log("entered Otp",otp)
}

}
catch(error){
  console.log(error)
}

}


//  form handler
  const handleSubmit = async(e) => {
     e.preventDefault();
    try{
      if(!useOtp){
    const Response=await fetch(`${Api_Path}/otp/Reg`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({userName,email,password})
  })
      const Data= await Response.json()
      if(Response.ok){
        alert('SignUp Successful')
        Loginhandler()
        

      }
      if(!Response.ok){
         if(Response.status===400 && Data.msg==='User Registered already'){
           alert("this email Registered already")
         }
      }
    }
    else {
      console.log(error)
    }
    }
    catch(error){
      console.log(error)
    }
    
  };

  const handleSendOtp = async () => {
    if (!email || !userName) return alert('Fill in email and username first');
    setotpLoading(true)
    //generate otp
    try{
        const Response=await fetch(`${Api_Path}/otp/Otpgen`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({userName,email})
    })
     const Data=await Response.json()
    if(Response.ok){
       setotpLoading(false)

    }
    if(!Response.ok){
       if(Response.status===409 && Data.msg==="user already Registered"){
        alert("user already Registered")
       }
       return
    }

    }
    catch(error){
          console.log(error)
    }
    setShowOtpModal(true);
  };


  const Resendhandler=async (req,res)=>{
      
    try{
      const Response=await fetch(`${Api_Path}/otp/resend`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({userName,email})
    })
    const Data=await Response.json()
    if(Response.ok){
      if(Response.status==200 && Data.msg==='opt Resend to your email'){
         alert("opt Resend to your email")
      }
    }
  }
    catch(error){
         console.log(error)
    }
}




  useEffect(()=>{
    if(otp.length===6 && showOtpModal){
       OtpVerify()
       setShowOtpModal(false)
    }
  },[otp])

  
  return (
    
    <div className='login'>
      
      
      <form onSubmit={handleSubmit}>
            <h2>Register</h2>
        <input
          type='text'
          placeholder='Enter username'
          name='userName'
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <br />
        <input
          type='email'
          placeholder='Enter your email address'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <label className='checkbox-label'>
          <input
            type='checkbox'
            checked={useOtp}
            onChange={() => setUseOtp(!useOtp)}
          />
          Use OTP instead of password
        </label>
        <br />

        {!useOtp ? (
          <input
            type='password'
            placeholder='Enter password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        ) : (
          <>
            <button type='button' onClick={handleSendOtp}>
              {otpLoading ? <span>Sending...</span>:<span>Send OTP</span>}
            </button>
          </> 
        )}

        <br />
        {!useOtp && <button type='submit'>Register</button>}
      </form>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className='modal-backdrop'>
        <div className='modal'>
          <h3>Enter OTP</h3>
          
          <Otp size={6} setOtp={setOtp} />
      
          <div className='resend-container'>
            <p>Not received OTP?</p>
            <button onClick={Resendhandler} className='resend-btn'>Resend</button>
          </div>
      
          <button className='close-btn' onClick={() => setShowOtpModal(false)}>
            Close
          </button>
        </div>
      </div>
      
      
      )}
    </div>
    
  );
}

export default Register;
