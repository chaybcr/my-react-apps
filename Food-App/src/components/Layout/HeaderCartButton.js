import React,{useContext,useEffect,useState} from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnHighlighted, setbtnhighlighted] =useState(false)
 const cartCtx = useContext(CartContext)
 const {items} = cartCtx;
 const noofCartItems = cartCtx.items.reduce((currNumber, item)=>{
   return currNumber + item.amount
 },0);
 

 const btnClasses = `${classes.button} ${btnHighlighted? classes.bump: ''}`
 useEffect(()=>{
   if(items.length ===0){
     return;
   }
  setbtnhighlighted(true);
 const timer= setTimeout(() => {
    setbtnhighlighted(false);
  }, 300);

  return () =>{
    clearTimeout(timer);
  }
 },[items])
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noofCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
