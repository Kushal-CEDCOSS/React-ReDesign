import React, { createContext, useState } from "react";
import Data from "../Data";

const MyContext = createContext();

const Main = (props) => {
    
    const [products, setProducts] = useState(Data);
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [drawerState, setDrawerState] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [signedUser, setSignedUser] = useState("");

    return (
    <MyContext.Provider value={{products: [products, setProducts], total: [total, setTotal], cart: [cart, setCart], currentCategory: [currentCategory, setCurrentCategory], isSearched:[isSearched, setIsSearched], searchResults: [searchResults, setSearchResults], drawerState: [drawerState, setDrawerState], modalState: [modalState, setModalState], signedUser: [signedUser, setSignedUser]}}> 
        {props.children}
    </MyContext.Provider>
    )
}

export  { Main, MyContext };