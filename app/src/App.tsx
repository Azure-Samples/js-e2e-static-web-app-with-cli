import { useState, useEffect } from 'react';
import './App.css';

// Custom components
import NavBar from './components/NavBar';
import PublicHome from './components/PublicHome';
import PrivateHome from './components/PrivateHome';

function App() {

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    try {

        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        
        if(clientPrincipal){
          setUser(clientPrincipal);
          userHasAuthenticated(true);
          console.log(`clientPrincipal = ${JSON.stringify(clientPrincipal)}`);
        } 
        
    } catch (error:any) {
        console.error('No profile could be found ' + error?.message?.toString());
    }
};  

  return (
    <div className="App">
      <NavBar user={user}/>
      <main className="column">
        { isAuthenticated ? <PrivateHome user={user}/> : <PublicHome /> }
      </main>
    </div>
  )
}

export default App;