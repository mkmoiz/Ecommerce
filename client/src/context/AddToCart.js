
import { useState, useEffect, useContext, createContext } from "react";
// import axios from "axios";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    var exitstCartItem=localStorage.getItem('cart')
    if(exitstCartItem)setCart(JSON.parse(exitstCartItem))
  },[])
  
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };