import useInput from "../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const BasicForm = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsvalid,
    hasError: FirstNameInputhasError,
    valueChangeHandler: firstNameChangedHandler,
    valueInputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(isNotEmpty);
  const {
    value: lastNameValue,
    isValid: lastNameIsvalid,
    hasError: lastNameInputhasError,
    valueChangeHandler: lastNameChangedHandler,
    valueInputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsvalid,
    hasError: emailInputhasError,
    valueChangeHandler: emailChangedHandler,
    valueInputBlurHandler: emailBlurHandler,
    reset: resetemailInput,
  } = useInput(isEmail);

  let formIsValid = false;

  if(firstNameIsvalid && lastNameIsvalid && emailIsvalid ){
    formIsValid = true;
  }
  const formSubmitHandler = (event)=>{
    event.preventDefault();

    if(!formIsValid){
      return;
    }
    console.log("form submitted!!")

    resetFirstNameInput();
    resetLastNameInput();
    resetemailInput();
  }

  const firstNameClasses = FirstNameInputhasError
  ? "form-control invalid"
  : "form-control";
  const lastNameClasses = lastNameInputhasError
  ? "form-control invalid"
  : "form-control";
  const emailClasses = emailInputhasError
  ? "form-control invalid"
  : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstNameValue}
            onChange={firstNameChangedHandler}
            onBlur={firstNameBlurHandler}
          />
          {FirstNameInputhasError && <p className="error-text">Please Enter a First Name</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastNameValue}
            onChange={lastNameChangedHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameInputhasError && <p className="error-text">Please Enter a last Name</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input type="text" id="name"
        value={emailValue}
        onChange={emailChangedHandler}
        onBlur={emailBlurHandler}
         />
         {emailInputhasError && <p className="error-text">Please Enter a Valis Email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
