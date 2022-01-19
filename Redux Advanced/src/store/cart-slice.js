import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed:false
  },
  reducers: {
      replaceCart(state,action){
          state.items = action.payload.items;
          state.totalQuantity = action.payload.totalQuantity;
      },
    additemtoCart(state, action) {
      const newitem = action.payload;
      const existingItem = state.items.find((item) => item.id === newitem.id);
      state.totalQuantity++;
      state.changed=true;
      if (!existingItem) {
        state.items.push({
          id: newitem.id,
          price: newitem.price,
          quantity: 1,
          totalPrice:newitem.price,
          title:newitem.title
        });
      }else{
          existingItem.quantity++;
          existingItem.totalPrice = existingItem.totalPrice + newitem.price
      }
    },
    removeItemtoCart(state,action) {
        const id = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
        state.totalQuantity--;
        state.changed=true;
        if(existingItem.quantity === 1){
       state.items = state.items.filter(item => item.id !==id);
        }else{
            existingItem.quantity--;
            existingItem.totalPrice = existingItem.totalPrice -  existingItem.price;
        }
    },
  },
});



export const cartSliceActions = cartslice.actions;

export default cartslice;
