import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Search from './pages/search/Search';


function App() {
  

  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/search/:page?/:owner?/:repository?' component={Search}/>
      </Switch>
    </Router>
  );
}

export default App;
