import { useState, useEffect, useRef } from 'react';
import NavBar from './Components/NavBar';
import Status from './Components/Status';
import './App.css';

function App() {

  // auth
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const mountFlagAuth = useRef(false)

  // data
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const mountFlagData = useRef(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!mountFlagAuth.current) {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;

        if (clientPrincipal) {
          setUser(clientPrincipal);
          userHasAuthenticated(true);
          setUserName(clientPrincipal?.userDetails.toLowerCase().split(' ').map(x => x[0].toUpperCase() + x.slice(1)).join(' '))
          console.log(`clientPrincipal = ${JSON.stringify(clientPrincipal)}`);
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!mountFlagData.current) {
        mountFlagData.current = true;
        const data = await fetch(`/api/users`);
        const json = await data.json();
        setUsers(json);
      }
    }

    fetchData();
  }, []);

  const sendDataToApi = async (e: any) => {
    e.preventDefault();
    const data = await fetch(`/api/users?user=${name}`, { method: "POST" });
    const returnedName = await data.text();

    if (returnedName) {
      setMessage(returnedName);
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
      <NavBar user={user} />
      <header className="App-header">
        <form id="form1" className="App-form" onSubmit={e => sendDataToApi(e)}>
          <div>
            <input
              type="text"
              id="name"
              className="App-input"
              placeholder="Enter name to add to data list"
              value={name}
              onChange={e => setName(e.target.value)} />
            <button type="submit" className="App-button">Submit</button>
          </div>
        </form>
        <div><h5>Name added: {message} </h5></div>

        <details>
          <summary>Public data</summary>
          <p><h5>Data: {JSON.stringify(users)}</h5></p>
        </details>

        {isAuthenticated ?
          <div>
            <details>
              <summary>Private data - just for {userName}</summary>
              <p>
                <h5>Auth: {isAuthenticated}</h5>
                <p><Status user={user} /></p>
              </p>
            </details>
            <p>{JSON.stringify(user)}</p>
          </div>
          : <div>Sign in for private data access</div>
        }


      </header>
    </div>
  );
}

export default App;