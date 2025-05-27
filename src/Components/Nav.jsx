// Nav.js
import React, { useEffect, useState } from 'react';
import { FcShare } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";

function Nav({ exportChat, shareChat, Registerhandler, Loginhandler, afterLogin,Logouthandler }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem("UserName");
    if (storedUser) setUser(storedUser);
  }, [afterLogin]);

  const handleLogout = () => {
    localStorage.removeItem("UserName");
    window.location.reload(); // or call a prop function to update auth state
  };

  return (
    <div className="nav">
      <div className="navcontent">
        <span className="logo">DoctorAi</span>

        <div className="auth">
          {!afterLogin ? (
            <div className="beforelogin">
              <span className="auth-link" onClick={Loginhandler}>Login /</span>
              <span className="auth-link" onClick={Registerhandler}>Signup</span>
            </div>
          ) : (
            <div className="afterlogin">
              <div className="user">
                <h3><FaUserCircle />{user}</h3>
                   <select onChange={(e)=>{if(e.target.value==='Logout'){Logouthandler()}}} >
                        <option value=""></option>
                        <option value="Logout"> Logout </option>
                   </select>
                
              </div>
              <button onClick={shareChat} title="Share Chat">
                <FcShare />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
