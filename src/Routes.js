import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Overview, Details } from './components';

const Routes = props => {
  return (
    <Switch>
      <Route path='/details/:placeId' component={Details} />
      <Route exact path='/' component={Overview} />
    </Switch>
  )
}

export default Routes;