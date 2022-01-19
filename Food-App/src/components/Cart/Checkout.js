import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const cityInputRef = useRef();
    const postalInputRef = useRef();

    const[formInputValidity, setFormInputvaliduty] = useState({
      name: true,
      street:true,
      city: true,
      postal:true
    })


  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredstreet = streetInputRef.current.value
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid   = !isEmpty(enteredName)
    const enteredStreetIsValid   = !isEmpty(enteredstreet)
    const enteredCityIsValid   = !isEmpty(enteredCity)
    const enteredPostalIsValid   = isFiveChars(enteredPostal);

    setFormInputvaliduty({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        city:enteredCityIsValid,
        postal:enteredPostalIsValid
    })

    const formIsvalid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

    if(!formIsvalid){
        return;
    }

    props.onConfirm({
        name:enteredName,
        street:enteredstreet,
        postal:enteredPostal,
        city:enteredCity
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name? '':classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.street? '':classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.postal? '':classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}  />
        {!formInputValidity.postal && <p>Please enter a valid postal code</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.city? '':classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}  />
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;