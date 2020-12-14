import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Outer from '../Templates/Outer';
import { Login, Verification } from '../Auth/Loadable';
import NotFound from '../NotFoundPage/Loadable';
import Register from '../Auth/Register';

function Auth() {
  return (
    <Outer>
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
        {/* <Route path="/auth/reset-password" component={ResetPassword} /> */}
        <Route path="/auth/verification" component={Verification} />
        <Route component={NotFound} />
      </Switch>
    </Outer>
  );
}

export default Auth;
