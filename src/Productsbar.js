import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { MyContext } from "./Contexts/Main";
import "./Productsbar.css";

const Productsbar = () => {
  const context = useContext(MyContext);

  // Function for Search 
  const search = () => {
    window.scrollTo({top: 350, behavior: 'smooth'});
    context.searchResults[1]([]);
    setTimeout(()=>{
    var input = document.getElementById('searchQuery').value;
    var criteria = context.currentCategory[0];
    if(input === "" && criteria === "")
    {
      context.isSearched[1](false);
      context.searchResults[1]([]);
    }
    else if(input !== "" && criteria === "")
    {
      var temp = context.products[0].filter(item => item.pname.toLowerCase().includes(input.toLowerCase()));
      context.isSearched[1](true);
      context.searchResults[1](temp);
    }
    else if(input === "" && criteria !== "")
    {
      temp = context.products[0].filter(item=> item.mainCat === criteria);
      context.isSearched[1](true);
      context.searchResults[1](temp);
    }
    else if(input !== "" && criteria !== "")
    {
      var temp1 = context.products[0].filter(item => item.mainCat === criteria); 
      var temp2 = temp1.filter(item => item.pname.toLowerCase().includes(input.toLowerCase()));
      context.isSearched[1](true);
      context.searchResults[1](temp2);
    }
    },1)
    
  }
  useEffect(()=>{
    if(context.currentCategory[0] === "" && context.isSearched[0] === false)
    {
      return;
    }
    search();
  },[context.currentCategory[0]])
  return (
    <div className="Productsbar">
      <div className="subbar">
        <p>
          Order Timing : <span className="greenText"> 8:00 am </span> To{" "}
          <span className="greenText">6:00 pm</span>
          <span>Store Close</span>
        </p>
        <div className="buttonsGroup">
          <button>My Offers</button>
          <button>Page Likes 12</button>
        </div>
      </div>
      <img
        src="http://www.way2door.com/images/stores/banner_1574312382banner-lucknow-veg-express-min.png"
        alt="Top Header"
      />
      <div className="filtersArea">
        <div className="searchArea">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input id="searchQuery" type="search" onChange={search} placeholder="Search a grocery item" />
        </div>
        <select className="categories" id="categories" onChange={()=>{context.currentCategory[1](document.getElementById('categories').value)}}>
          <option value="">ALL CATEGORIES</option>
          <option value="Fresh_Fruits">Fresh Fruits</option>
          <option value="Fresh_Vegetables">Fresh Vegetables</option>
          <option value="Dry_Fruits">Dry Fruits</option>
          <option value="Fresh_Non_Veg">Fresh Non Veg</option>
          <option value="Fresh_Non_Veg">Dairy Products</option>
        </select>
      </div>
      <div className="productsArea">
      {context.isSearched[0] ? context.searchResults[0].length === 0 ? <h1 className="error">No Results Found !!</h1> :
      <>{context.searchResults[0].map((item, index) => (
        <Card
          key={index}
          id={item.productId}
          name={item.pname}
          photo={item.pimage}
          unit={item.pUnit}
          category={item.mainCat}
          costPrice={item.price}
          sellPrice={item.sellPrice}
          status={item.is_in_cart}
          quantity={item.quantity}
        />
      ))}</>
      :
      <>
      {context.products[0].map((item, index) => (
          <Card
            key={index}
            id={item.productId}
            name={item.pname}
            photo={item.pimage}
            unit={item.pUnit}
            category={item.mainCat}
            costPrice={item.price}
            sellPrice={item.sellPrice}
            status={item.is_in_cart}
            quantity={item.quantity}
          />
        ))}
      </>
      }
      </div>
    </div>
  );
};

export default Productsbar;
