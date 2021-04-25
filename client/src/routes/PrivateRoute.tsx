import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { RootState } from '../utilities/types';

interface Props extends RouteProps {
  component: any;
}

export const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { isAuth } = useSelector((state: RootState) => state.authState);

  return <Route render={(props) => (isAuth ? <Component {...props} /> : <Redirect to='/' />)} {...rest} />;
};
