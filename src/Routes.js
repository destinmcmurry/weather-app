import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Overview } from './components';

const Routes = props => {
  return (
    <Switch>
      {/*<Route path='/details/:city' component={Details} />*/}
      <Route path='/' component={Overview} />
    </Switch>
  )
}

export default Routes;