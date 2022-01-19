import { useReducer } from "react";

const initialInputState = {
    value:'',
        isTouched:false
}
const inputStateReducer = (state,action) =>{
    if(action.type ==='INPUT'){
        return {
            value: action.value,
            isTouched:state.isTouched
        }
    }
    if(action.type ==='BLUR'){
        return {
            value: '',
            isTouched:true
        }
    }
    if(action.type ==='RESET'){
        return {
            value: action.value,
            isTouched:false
        }
    }

    return initialInputState;
}

const useInputNew = (validateValue) => {
 const [inputState, dispatch] = useReducer(inputStateReducer,initialInputState)

  const valueIsvalid = validateValue(inputState.value);
  const hasError = !valueIsvalid && inputState.isTouched;

  const valueChangeHandler = (event) => {
      dispatch({type:'INPUT',value:event.target.value})
  };

  const valueInputBlurHandler = (event) => {
    dispatch({type:'BLUR'})
  };

  const reset = ()=>{
      dispatch({type:'RESET'})
  }

  return {
    value: inputState.value,
    isValid:valueIsvalid,
    hasError: hasError,
    valueChangeHandler,
    valueInputBlurHandler,
    reset
  };
};

export default useInputNew;
