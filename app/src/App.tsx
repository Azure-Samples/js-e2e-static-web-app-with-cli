import { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Custom components
import NavBar from './components/NavBar';
import PublicHome from './components/PublicHome';
import PrivateHome from './components/PrivateHome';

function App() {

  return (
    <div className="App">
      <NavBar />
      <main className="column">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={PublicHome} />
              <Route exact path="/private" component={PrivateHome} />
            </Switch>
          </Suspense>
        </Router>
      </main>
    </div>
  )
}

export default App;