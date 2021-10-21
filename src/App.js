import './App.css';
import { useEffect, useRef, useState } from 'react';


function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handelAddName = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email }

    // send data to the server
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const addedUsers = data;
        const newusers = [...users, addedUsers];
        setUsers(newusers)
      })
    nameRef.current.value = '';
    emailRef.current.value = '';

    e.preventDefault();


  }
  return (
    <div className="App">
      <h1>Hello Users {users.length}</h1>
      <form onSubmit={handelAddName} >
        <input ref={nameRef} type="text" name="name" placeholder="Enter Your Name" id="" /> <br />
        <input ref={emailRef} type="email" name="email" placeholder="Enter Your Email" id="" /> <br />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}> Name: {user.name} Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
