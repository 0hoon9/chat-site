import React, { useState, useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PublicRoute } from './routes/PublicRoute';
import { PrivateRoute } from './routes/PrivateRoute';
import { Login } from './screens/Login';
import { Main } from './screens/Main';
import { login } from './store/auth.slice';

export const App = () => {
  const dispatch = useDispatch();
  const [ifUserIsLoggedIn, setIfUserIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');

    if (loggedInUser) {
      dispatch(login(JSON.parse(loggedInUser)));
    }

    setIfUserIsLoggedIn(true);
  }, [dispatch, setIfUserIsLoggedIn]);

  return (
    <Switch>
      <PublicRoute path='/' component={Login} exact />
      <PrivateRoute path='/chat' component={Main} exact />
      <Redirect to='/' />
    </Switch>
  );
};

export default App;
