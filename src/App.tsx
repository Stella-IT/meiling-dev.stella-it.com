import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './style/_reset.scss';
import './style/_config.scss';

import LogoImg from './components/atoms/LogoImg';
import Index from './components/pages/Index';
import SignIn from './components/pages/SignIn';
import SocialSignIn from './components/pages/SocialSignIn';

function App() {
  return (
    <Fragment>
      <LogoImg />
      <Router>
        
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route path="/socialsignin">
            <SocialSignIn />
          </Route>
        </Switch>
        
      </Router>
    </Fragment>
  );
}

export default App;
