import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0,showCounter:false }

const counterSlice = createSlice({
    name:'counter',
    initialState:initialState,
    reducers:{
        increment(state){
            state.counter++;
        },
        decrement(state){
            state.counter--;
        },
        increase(state,action){
            state.counter =  state.counter + action.payload.value;
        },
        toggle(state){
            state.showCounter = !state.showCounter;
        }
    }
});
export const counterActions = counterSlice.actions;

export default counterSlice.reducer;