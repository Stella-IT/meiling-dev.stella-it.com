import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './style/_reset.scss';
import './style/_config.scss';

import LogoImg from './components/atoms/LogoImg';
import Index from './components/pages/Index';
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
          <Route path="/socialsignin">
            <SocialSignIn />
          </Route>
        </Switch>
        
      </Router>
    </Fragment>
  );
}

export default App;
