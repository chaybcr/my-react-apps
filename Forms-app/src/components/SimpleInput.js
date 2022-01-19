import useInput from "../hooks/use-input";
const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid:enteredNameISValid,
    hasError: nameInputhasError,
    valueChangeHandler: nameChangedHandler,
    valueInputBlurHandler: nameBlurHandler,
    reset:resetNameInput
  } = useInput(value => value.trim()!=='');

  const {
    value: enteredEmail,
    isValid:enteredEmailISValid,
    hasError: emailInputhasError,
    valueChangeHandler: emailChangedHandler,
    valueInputBlurHandler: emailBlurHandler,
    reset:resetEmailInput
  } = useInput(value => value.includes('@'));

  // const [userName, setUserName] = useState("");
  // const [userNameTouched, setUserNameTouched] = useState(false);

  // const [userEmail, setUserEmail] = useState("");
  // const [userEmailTouched, setUserEmailTouched] = useState(false);

  // const userNameValid = userName.trim() !== '';
  // const nameInputIsValid = !userNameValid && userNameTouched;

  // const userEmailValid = userEmail.includes("@");
  // const emailInputIsValid = !userEmailValid && userEmailTouched;

  let formIsValid = false;

  if (enteredNameISValid && enteredEmailISValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  // const nameInputChangeHandler = (event) => {
  //   setUserName(event.target.value);
  // };

  // const emailInputChangeHandler = (event) => {
  //   setUserEmail(event.target.value);
  // };

  // const nameInputBlurHandler = (event) => {
  //   setUserNameTouched(true);
  // };

  // const emailInputBlurHandler = (event) => {
  //   setUserEmailTouched(true);
  // };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    // if (!enteredNameISValid) {
    //   return;
    // }

    resetNameInput();
    resetEmailInput();

    // setUserEmail("");
    // setUserEmailTouched(false);
  };

  const inputClasses = nameInputhasError
    ? "form-control invalid"
    : "form-control";

  const emailinputClasses = emailInputhasError
    ? "form-control invalid"
    : "form-control";
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={inputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputhasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailinputClasses}>
        <label htmlFor="email">Your E-Mail</label>
        <input
          type="email"
          id="email"
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputhasError && <p className="error-text">Enter Valid Email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
