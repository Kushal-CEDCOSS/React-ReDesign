import React, { useContext } from 'react';
import { MyContext } from './Contexts/Main';
import './Sidebar.css';

const Sidebar = () => {

  const idArray=['one', 'two', 'three', 'four', 'five'];

  const context = useContext(MyContext);

  const setActive = (id) => {
    idArray.map(item => item === id ? document.getElementById(id).classList.add('active') : document.getElementById(item).classList.remove('active'))
  }


  return (
    <div className="Sidebar">
        <h3>LUCKNOW VEG <br/>EXPRESS</h3>
        <span className="starAlign">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        </span>
        <p>Average 3.5/5</p>
        <div className="buttonsArea">
            <button>View Reviews</button>
            <button>Contact Info</button>
        </div>
        <ul>
            <li id="one" onClick={()=>{context.currentCategory[1]("Fresh_Fruits"); setActive('one');}}>Fresh Fruits</li>
            <li id="two" onClick={()=>{context.currentCategory[1]("Fresh_Vegetables"); setActive('two');}}>Fresh Vegetables</li>
            <li id="three" onClick={()=>{context.currentCategory[1]("Dry_Fruits"); setActive('three');}}>Dry Fruits</li>
            <li id="four" onClick={()=>{context.currentCategory[1]("Fresh_Non_Veg"); setActive('four');}}>Fresh Non Veg</li>
            <li id="five" onClick={()=>{context.currentCategory[1]("Dairy_Products"); setActive('five');}}>Dairy Products</li>
            <li onClick={()=>{context.currentCategory[1](""); idArray.map(item => document.getElementById(item).classList.remove('active'))}}>Remove Filters <i className="fa-solid fa-trash-can"></i></li>
        </ul>
    </div>
  )
}

export default Sidebar