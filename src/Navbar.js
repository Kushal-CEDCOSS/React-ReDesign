import React, { useContext } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import './Navbar.css';
import { MyContext } from './Contexts/Main';

const Navbar = () => {
  const context = useContext(MyContext);
  window.onscroll = () => {resizeLogo(); scrollFunction();};
  
  function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("backToTop").style.display = "flex";
    } 
    else {
      document.getElementById("backToTop").style.display = "none";
    }
  }

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  const resizeLogo = () => {
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)
    {
      document.getElementById('logoImage').style.height = '8vw';
      document.getElementById('logoImage').style.width = '15%';
      document.getElementById('navbar').style.height = '10vw';
      document.getElementById('lowerNavbar').style.top = '10vw';
    }
    else{
      document.getElementById('logoImage').style.height = '10vw';
      document.getElementById('logoImage').style.width = '18%';
      document.getElementById('navbar').style.height = '12vw';
      document.getElementById('lowerNavbar').style.top = '10vw';
    }
  }

  const minus = (e) => {
    if(e.target.nextSibling.innerText === "0")
    {
      return;
    }
    else if(e.target.nextSibling.innerText === "1")
    {
      deleteItem(e);
      return;
    }
    var sum = 0;
    var id = e.target.id;
    var temp = [...context.cart[0]];
    temp.map((item) => (item.productId === id ? (item.quantity -= 1) : null));
    temp.map((item) => (item.productId === id ? (item.itemSum = item.quantity * item.sellPrice) : null));
    temp.map((item) => (sum += item.price * item.quantity));
    context.cart[1](temp);
    context.total[1](sum.toFixed(2));
  }

  const plus = (e) => {
    var sum = 0;
    var pos = -1;
    var id = e.target.id;
    var temp = [...context.cart[0]];

    temp.map((item, index) => item.productId === id ? pos = index : null);
    if(pos === -1)
    {
      var temp1 = context.products[0].filter(item => item.productId === id);
      temp1[0]['quantity']=1;
      temp1[0]['itemSum']=temp1[0]['quantity']*temp1[0]['sellPrice'];
      temp1[0]['is_in_cart']=true;
      var newCart = [...context.cart[0], temp1[0]];
      context.cart[1](newCart);
    }
    else{
      temp.map(item => item.productId === id ? item.quantity +=1 : null)
      temp.map((item) => (item.productId === id ? (item.itemSum = item.quantity * item.sellPrice) : null));
      temp.map((item) => (sum += item.sellPrice * item.quantity));
      context.cart[1](temp);
      context.total[1](sum.toFixed(2));
    }
  };


  const deleteItem = (e) => {
    if(!window.confirm('You are about to delete this product from your cart, are you sure?'))
    {
      return;
    }
    var sum = 0;
    var pos = -1;
    var id = e.target.id;
    var temp = [...context.cart[0]];
    temp.map((item, index) => (item.productId === id ? (pos = index) : null));
    temp[pos].quantity = 0;
    temp[pos]['is_in_cart'] = false;
    temp.splice(pos, 1);
    temp.map((item) => (sum += item.sellPrice * item.quantity));
    context.cart[1](temp);
    context.total[1](sum.toFixed(2));
  };

  // Empty cart on checkout.
  const emptyCart = () => {
    var temp = [...context.cart[0]]
    temp.map(item => item.quantity = 0)
    temp.map(item => item.is_in_cart = false)
    temp = [];
    context.cart[1](temp);
    context.total[1](0);
    context.drawerState[1](false);
  }
  return (
    <>
    <div className="backToTop" id="backToTop" onClick={scrollToTop}>
      {useMediaQuery('(max-width:768px)') ? <KeyboardArrowUpIcon sx={{fontSize: '5vh'}}/> : <KeyboardArrowUpIcon sx={{fontSize: '4vw'}}/>}
    </div>
    <div className="cartArea" onClick={()=>{context.drawerState[1](true)}}>
      <div className="cartCounter2">{context.cart[0].length}</div>
      <i className="fa-brands fa-opencart"></i>
    </div>
    <div className="Navbar" id="navbar">  
      <img id="logoImage" src="http://www.way2door.com/images/way2door-min.png" alt="" />
      <h2>Today's order will be delivered tomorrow. सबसे सस्ता और सबसे अच्छा.</h2>
      <i className="fa-brands fa-opencart" onClick={()=>{context.drawerState[1](true)}}></i>
      <div className="cartCounter">{context.cart[0].length}</div>
    </div>
    <div className="lowerNavbar" id="lowerNavbar">
      <button>Fruits and Vegetables Store</button>
    </div>

    <div className="fakeNavbar">
      <img src="http://www.way2door.com/images/way2door-min.png" alt='' />
      {context.signedUser[0] === "" ? <div>
        <div className="block"><i className="fa-solid fa-paper-plane"></i><p onClick={()=>{context.modalState[1](true)}}>Register</p></div>
        <div className="block"><i className="fa-solid fa-right-to-bracket"></i><p onClick={()=>{context.modalState[1](true)}}>Login</p></div>
        <div className="block"><i className="fa-solid fa-location-dot"></i><p>Lucknow</p></div>
      </div> : 
      <h2 className="user">Welcome, {context.signedUser[0]}</h2>}
      
    </div>
    <Drawer 
    anchor="right"
    open={context.drawerState[0]}
    onClose={()=>{context.drawerState[1](false)}}>
      <button className="closeButton" onClick={()=>{context.drawerState[1](false)}}>X</button>
      <div className="tableArea">
      <h1 className="animate__animated animate__bounceInDown animate__slow">Your Shopping Cart</h1>
            <h2 className="animate__animated animate__fadeIn animate__slower">Total Cart Value : <span>₹{context.total[0]}</span></h2>
            {context.cart[0].length === 0 ? <h1 style={{margin: 'auto', fontSize: '3vw'}}>Your Cart is Empty!!</h1> : <><table className='animate__animated animate__bounceInUp animate__slow'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Item Sum</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {context.cart[0].map((item, index) => <tr key={index}><td><img src={item.pimage} alt="" /></td><td>{item.pname}</td><td><button id={item.productId} onClick={minus}>-</button><span>{item.quantity}</span><button id={item.productId} onClick={plus}>+</button></td><td>{item.itemSum}</td><td><i id={item.productId} onClick={deleteItem} className="fa-solid fa-trash-can"></i></td></tr>)}
              </tbody>
            </table>
            <button onClick={()=>{ if(context.signedUser[0] === ""){context.modalState[1](true)} else{alert(`Your order of ₹${context.total[0]} will be delivered soon!!!`); setTimeout(emptyCart,500)}}} className="checkout animate__animated animate__bounceInUp animate__slower">Checkout</button>
            </>
            }
      </div>
    </Drawer>
    </>
  )
}

export default Navbar