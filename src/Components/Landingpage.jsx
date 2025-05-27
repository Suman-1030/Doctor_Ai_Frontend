// Landingpage.js
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import '../App.css';
import Chat from './Chat';
import Banner from './Banner'
import DoctorFooter from './DoctorFooter';
import Otp from './Otp';
import Test from './test';
import Register from './Register';
import Login from './Login';
import BeforeLogin from './BeforeLogin';



function Landingpage() {
  const [showLogin,setshowLogin]=useState(false)
  const [showRegister,setshowRegister]=useState(false)
  const [afterLogin,setafterLogin]=useState(false)
  const [childprompt,setchildprompt]=useState(false)
  const [ShowLogout,setShowLogout]=useState(false)
  const [beforeLogin,setbeforeLogin]=useState(false)




  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Export as JSON file
  function exportChat() {
    const dataStr = JSON.stringify(chatHistory, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-history.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Share via WhatsApp
  function shareChat() {
    if (chatHistory.length === 0) {
      alert('No chat to share.');
      return;
    }

    const text = chatHistory
      .map((entry) => `${entry.role === 'user' ? 'You' : 'DoctorAI'}: ${entry.content}`)
      .join('\n\n');

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  }

 function Registerhandler(){
  setshowRegister(true)
  setshowLogin(false)
 }
function Loginhandler(){
  setshowRegister(false)
  setshowLogin(true)
}

const handlehistory=(data)=>{
  setchildprompt(data)
}
const Logouthandler=()=>{
      localStorage.clear()
      window.location.reload()
}



useEffect(()=>{
  
  const Logged= localStorage.getItem('UserId')
  if(Logged){
     setafterLogin(true)
     setbeforeLogin(false)
  }
  else{
    setafterLogin(false)
    setbeforeLogin(true)
  }

},[])


  return (
    <div>
       <Nav Registerhandler={Registerhandler} Loginhandler={Loginhandler} exportChat={exportChat} shareChat={shareChat} afterLogin={afterLogin} Logouthandler={Logouthandler}/> 
       
         
                    {showRegister && <Register />}
                    {showLogin && <Login />}
         
          

      {afterLogin && <div>  
             <Banner childprompt={childprompt}/>
             <div><Chat setChatHistory={setChatHistory} handlehistory={handlehistory} /></div>
             <DoctorFooter/>
        </div>  }     

    </div>  
    
  );
}

export default Landingpage;