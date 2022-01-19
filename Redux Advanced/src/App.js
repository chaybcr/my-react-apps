import { useEffect, Fragment } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
//import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import {sendCartData, fetchCartData} from './store/cart-actions'

let isInitial= true;

function App() {
  const showcart = useSelector((state) => state.ui.cartIsVisibile);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

useEffect(()=>{
dispatch(fetchCartData())
},[dispatch])

  useEffect(() => {
  //  const senCartData = async () => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "pending",
    //       title: "sending",
    //       message: "sending cart data",
    //     })
    //   );
    //   const response = await fetch(
    //     "https://react-http-162a8-default-rtdb.firebaseio.com/cart.json",
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(cart),
    //     }
    //   );
    //   if (!response.ok) {
    //     throw new Error("sending data to cart failed ");
    //   }
    //  // const responseData = await response.json();
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "success",
    //       title: "success",
    //       message: "sent cart data successfully",
    //     })
    //   );
   // };

    if(isInitial){
      isInitial=false;
      return;
    }
  
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
    

    // senCartData().catch(error => {
    //   console.log(error)
    //   // dispatch(
    //   //   uiActions.showNotification({
    //   //     status: "error",
    //   //     title: "Error",
    //   //     message: "sending cart data failed!",
    //   //   })
    //   // );
    // });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showcart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
