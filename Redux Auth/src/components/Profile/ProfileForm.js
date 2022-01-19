import react, {useRef,useContext} from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
const ProfileForm = () => {
 const history = useHistory();
  const newPassRef = useRef();

  const authCtx = useContext(AuthContext);
  const submitHandler = (event)=>{
    event.preventDefault();
 const enteredPassword = newPassRef.current.value;

 fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBK4Nein-WXF82FPelNvVObEGMhT9eQ_Z4',{
   method:'POST',
   body: JSON.stringify({
    idToken: authCtx.token,
    password: enteredPassword,
    returnSecureToken: false,
  }),
  headers: {
    "Content-Type": "application/json",
  },
 }).then(res=>{
  history.replace('/');
 })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPassRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
