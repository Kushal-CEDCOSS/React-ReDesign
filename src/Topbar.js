import { Modal } from '@mui/material';
import React, { useContext } from 'react';
import { MyContext } from './Contexts/Main';
import './Topbar.css';


const Topbar = () => {
  const context = useContext(MyContext);

  const validate = (e) => {
    e.preventDefault();
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    if(email.toLowerCase() !== 'kushal@gmail.com')
    {
      document.getElementById('loginEmail').style.border = "2px solid red";
      return;
    }
    else if(password !== '12345')
    {
      document.getElementById('loginEmail').style.border = "none";
      document.getElementById('loginPassword').style.border = "2px solid red";
      return;
    }
    else{
      document.getElementById('loginEmail').style.border = "none";
      document.getElementById('loginPassword').style.border = "none";
      document.getElementById('loginEmail').value= "";
      document.getElementById('loginPassword').value = "";
      context.signedUser[1]("Kushal");
      context.modalState[1](false);
    }


  }

  return (
    <div className="Topbar">
        <div className="left">
            <h3>Download</h3>
            <h4>WAY2DOOR APP</h4>
            <a target="blank" href="https://play.google.com/store/apps/details?id=io.ionic.way2doorapp" className="animate__animated animate__fadeIn animate__infinite">click here</a>
        </div>
        <div className="right">
          {context.signedUser[0] === "" ? 
          <>
            <span><i className="fa-solid fa-location-dot"></i><p>Selected Delivery Location : Lucknow(226010)</p></span>
            <span><i className="fa-solid fa-right-to-bracket"></i><p onClick={()=>{context.modalState[1](true)}} >Login</p></span>
            <span><i className="fa-solid fa-paper-plane"></i><p onClick={()=>{context.modalState[1](true)}}>Signup</p></span>
          </> : 
          <h2 style={{fontSize: '1.5vw', color: 'white', fontFamily: "'Amaranth', sans-serif", marginLeft: 'auto', marginRight: '5%', fontWeight: '100'}}>Welcome, {context.signedUser[0]}</h2>}
            
        </div>
        <Modal
        open={context.modalState[0]}
        onClose={()=>{context.modalState[1](false)}}
        >
          <form className="modalArea" onSubmit={validate}>
            <h1>Login</h1>
            <div className="labelHolder">
              <label>Email Address</label>
              <input id="loginEmail" required type="email" placeholder='Kushal@gmail.com' />
            </div>
            <div className="labelHolder">
              <label>Password</label>
              <input id="loginPassword" required type="password" placeholder='12345' />
            </div>
            <button type="submit">Login</button>
          </form>
        </Modal>
    </div>
  )
}

export default Topbar