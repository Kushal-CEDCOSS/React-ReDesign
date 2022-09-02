import React, { useContext } from 'react';
import './Card.css'
import { MyContext } from './Contexts/Main';


const Card = (props) => {
  const context = useContext(MyContext);


  // Function for Add to Cart Functionality
  const addTocart = (e) => {
    var sum = 0;
    var newCart = [...context.cart[0]];
    var pos = -1;
    newCart.map((item, index) =>
      item.productId === e.target.id ? (pos = index) : null
    );
    if (pos !== -1) {
      newCart[pos].quantity += 1;
      newCart[pos]['itemSum']=newCart[pos]['quantity']*newCart[pos]['sellPrice'];
      newCart[pos]['is_in_cart'] = true;
    } 
    else {
      var temp = context.products[0].filter(item => item.productId === e.target.id);
      temp[0]['quantity']=1;
      temp[0]['itemSum']=temp[0]['quantity']*temp[0]['sellPrice'];
      temp[0]['is_in_cart']=true;
      newCart = [...context.cart[0], temp[0]];
      context.cart[1](newCart);
    }
    newCart.map((item) => (sum += item.sellPrice * item.quantity));
    context.total[1](sum.toFixed(2));
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
    temp.map((item) => (sum += item.sellPrice * item.quantity));
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
      newCart.map((item) => (sum += item.sellPrice * item.quantity));
      context.cart[1](newCart);
      context.total[1](sum.toFixed(2));
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
  
  return (
    <div className="Card animate__animated animate__zoomIn animate__slow">
        <h3>{Math.ceil((props.costPrice - props.sellPrice)/props.costPrice*100)}% Save</h3>
        <img src={props.photo} alt={props.name} />
        <h2>{props.name}</h2>
        <div className="detailsRow">
          <h3>{props.unit}</h3>
          <p>₹{props.costPrice}</p>
          <h5>₹{props.sellPrice}</h5>
        </div>
        <div className="mainRow">
            <button id={props.id} onClick={minus}>-</button>
            <span>{props.quantity}</span>
            <button id={props.id} onClick={plus}>+</button>
        </div>
        <div className="bottomRow">
          {props.status ? <button className='remove' id={props.id} onClick={deleteItem}>Remove</button> :<button className="addToCart" id={props.id} onClick={addTocart}>Add to Cart</button>}
        </div>
        
        
    </div>
  )
}

export default Card