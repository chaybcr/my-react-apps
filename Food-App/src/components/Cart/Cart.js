import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const[isSubmitting, setIsSubmitting] = useState(false);
  const[didSubmit,SetDidSubmit]= useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartitemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData)=>{
    setIsSubmitting(true);
 await fetch('https://react-http-162a8-default-rtdb.firebaseio.com/orders.json',{
    method:'POST',
    body: JSON.stringify({
      user:userData,
      orderedItems:cartCtx.items
    })
  });

  setIsSubmitting(false);
  SetDidSubmit(true);

  cartCtx.clearCart();
  }

  const cartitems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartitemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes["button"]} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const CartModelContent = <React.Fragment>
    {cartitems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />}
      {!isCheckout && modalActions}
  </React.Fragment>
const IsSubmittingModalContent = <p>Sending order data...</p>;

const didSubmitModalContent = <React.Fragment>
  <p>Successfully sent the order</p>
  <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>

</React.Fragment>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && CartModelContent}
      {isSubmitting && IsSubmittingModalContent}
      {!isSubmitting  && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
