import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login } from './screens/Login';
import Main from './screens/Main';

const App = () => {
  return (
    <Router>
      <Route path='/login' component={Login} exact />
      <Route path='/chat' component={Main} exact />
    </Router>
  );
};

export default App;
