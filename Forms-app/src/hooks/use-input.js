import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredvalue, setEnteredvalue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsvalid = validateValue(enteredvalue);
  const hasError = !valueIsvalid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredvalue(event.target.value);
  };

  const valueInputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = ()=>{
      setEnteredvalue('');
      setIsTouched(false);
  }

  return {
    value: enteredvalue,
    isValid:valueIsvalid,
    hasError: hasError,
    valueChangeHandler,
    valueInputBlurHandler,
    reset
  };
};

export default useInput;
