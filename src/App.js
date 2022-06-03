
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    // console.log(name,email);
    const user = { name, email};

    // post data to server 
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
  }
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>My USER : {users.length}</h1>
      <div style={{ textAlign: 'center' }}>
        <form onSubmit={handleAddUser}>
          <input type="text" name="name" placeholder='name' required />
          <input type="email" name="email" placeholder='email' required />
          <input type="submit" value='Add User' />
        </form>
      </div>
      <ul style={{ paddingLeft: '45%' }}>
        {
          users.map(user => <li key={user.id}>
            <h4>id: {user.id}</h4>
            <h5>name: {user.name}</h5>
            <p> email: {user.email}</p>

          </li>)
        }
      </ul>
    </div>
  );
}

export default App;
