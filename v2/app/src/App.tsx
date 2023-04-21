import { useState, useEffect, useRef } from 'react';

import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const mountFlag = useRef(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!mountFlag.current) {
        mountFlag.current = true;
        const data = await fetch(`/api/users`);
        const json = await data.json();
        setUsers(json);
      }
    }

    fetchData();
  }, []);

  const sendDataToApi = async (e: any) => {
    e.preventDefault();
    const data = await fetch(`/api/users?user=${name}`, { method: "POST"});
    const returnedName = await data.text();

    if (returnedName) {
      setMessage(`Hello ${returnedName}`);
    } else {
      setMessage(`Couldn't send name`);
    }
    const userResponse = await fetch(`/api/users`);
    const users = await userResponse.json();

    if (users) {
      setUsers(users);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Static Web App: React App with Azure Function API
        </p>
        <form id="form1" className="App-form" onSubmit={e => sendDataToApi(e)}>
          <div>
            <input
              type="text"
              id="name"
              className="App-input"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)} />
            <button type="submit" className="App-button">Submit</button>
          </div>
        </form>
        <div><h5>Message: {message} </h5></div>
        <div>{JSON.stringify(users)}</div>
      </header>
    </div>
  );
}

export default App;