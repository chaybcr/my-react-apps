import React,{useState, Fragment} from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList'

function App() {
  const [usersList,setUsersList] = useState([]);

  const addUserHandler = (uname,uage)=>{
    setUsersList((prevlist)=>{
      return [...prevlist, {name:uname,age:uage,id:Math.random().toString()}]
    })
  }
  return (
    <Fragment>
     <AddUser onAddUser={addUserHandler} />
     <UsersList users={usersList} />
    </Fragment>
  );
}

export default App;
