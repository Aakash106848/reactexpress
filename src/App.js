
import './App.css';

import {useState} from 'react';
import axios from 'axios';

function App() {
  const[userArray,setArray]=useState([]);
  const[UserID,setUserID]=useState("");
  const[Password,setPassword]=useState("");
  const[Email,setEmail]=useState("");

  const displayArray = () => {
    fetch('http://localhost:9901/All')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.text();
      })
      .then(data => {
        if (data) {
          try {
            const jsonData = JSON.parse(data);
            setArray(jsonData);
          } catch (error) {
            console.error('Error parsing JSON data:', error);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  const updateEmail=(e)=>{
    setEmail(e.target.value);
  }
  const updateUserID=(e)=>{
    setUserID(e.target.value);
  }
  const updatePassword=(e)=>{
    setPassword(e.target.value);
  }
  const addUser=(E)=>{
    E.preventDefault();
    axios.post('http://localhost:9901/AddUser', {
      uid:UserID,
      password:Password,
      email:Email
    })
    .then(response=>{
      console.log(response);
    });

  }
  const deleteUser = (e) => {
    e.preventDefault();
    axios
      .delete('http://localhost:9901/DeleteUser', {
        params: {
          uid: UserID,
        },
      })
      .then((response) => {
        console.log(response);
      });
  };
  const updateUser = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:9901/ModifyUser', {
        uid: UserID,
        password: Password,
        email: Email,
      })
      .then((response) => {
        console.log(response);
      });
  }
  const GetUserByID = (e) => {
    e.preventDefault();
    axios
      .get('http://localhost:9901/GetUserByID', {
        params: {
          uid: UserID,
        },
      })
      .then((response) => {
        console.log(response);
      });
  }
  const reset = (e) => {
    e.preventDefault();
    setUserID("");
    setPassword("");
    setEmail("");
  }
  return (
    <div >
      <form id='form' onSubmit={addUser} onReset={reset}>
      <label>UserID:</label>  <input type="text" value={UserID} placeholder="UserID" name="UserID" onChange={updateUserID}/><br/>
      <label>Password:</label>  <input type="text" value={Password} placeholder="Password" name="Password" onChange={updatePassword}/><br/>
        <label>Email:</label>  <input type="text" value={Email} placeholder="Email" name="Email" onChange={updateEmail}/><br/>
        <input type="submit" value="Add User"/>&nbsp;&nbsp;<input type="reset" value="Reset"/>
        &nbsp;<input type='button' value="Delete" onClick={deleteUser}/>
        &nbsp;<input type='button' value="Update" onClick={updateUser}/>
        &nbsp;<input type='button' value="GetUser" onClick={GetUserByID}/>
      </form>
      <input type="button" value="Display" onClick={displayArray}/>
      <ul>
      {Array.isArray(userArray) &&
        userArray.map((item) => (
          <li key={item.UserID}>
            UserID: {item.UserID}
            <br />
            Password: {item.Password}
            <br />
            E-mail: {item.Email}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
