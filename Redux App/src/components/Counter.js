import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";
import {counterActions} from '../store/counter'

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);

  const showCounter = useSelector(state =>state.counter.showCounter)

  const toggleCounterHandler = () => {
   // dispatch({ type: "toggle" });

   dispatch(counterActions.toggle());
  };

  const incrementHandler = () => {
   // dispatch({ type: "increment" });
   dispatch(counterActions.increment());
  };

  const increaseHandler = () => {
    // dispatch({ type: "increase", value:5 });
    // {type: some_identifier,payload:5}
    dispatch(counterActions.increase({value:5}));
  };

  const decrementHandler = () => {
    // dispatch({ type: "decrement" });
    dispatch(counterActions.decrement());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
