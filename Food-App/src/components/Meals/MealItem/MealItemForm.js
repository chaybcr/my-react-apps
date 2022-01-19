import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef,useState } from "react";

const MealItemForm = (props) => {
    const [amountIsValid,setAmountIsValid] = useState(true)
  const amountinputRef = useRef();
  const sumbitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountinputRef.current.value;
    const enteredAmountNo = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNo.length < 1 ||
      enteredAmountNo.length > 5
    ) {
        setAmountIsValid(false);
        return;
    }
    props.onAddToCart(enteredAmountNo);
  };
  return (
    <form className={classes.form} onSubmit={sumbitHandler}>
      <Input
        ref={amountinputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
