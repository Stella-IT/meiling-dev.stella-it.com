import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import './style/_reset.scss';
import './style/_config.scss';
import './style/_transition.scss';

import LogoImg from './components/atoms/LogoImg';
import SignIn from './components/pages/SignIn';
import SignOut from './components/pages/SignOut';
import SocialSignIn from './components/pages/SocialSignIn';
import Password from './components/pages/Password';
import Index from './components/pages/Index';
import TestMode from './components/pages/TestMode';
import Users from './components/pages/Users';
import UserInfo from './components/pages/UserInfo';
import TwoFactor from './components/pages/TwoFactor';

function App() {
  
  const darkThemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const isDarkMode = () => darkThemeMediaQuery.matches;
  
  const [theme, setTheme] = useState(isDarkMode() ? "dark" : "light");

  darkThemeMediaQuery.addEventListener("change", () => {
    setTheme(isDarkMode() ? "dark" : "light");
  });

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.remove("theme-light");
      document.body.classList.add("theme-dark");
    } else {
      document.body.classList.remove("theme-dark");
      document.body.classList.add("theme-light");
    }
  });

  return (
    <Fragment>
      <LogoImg />
      <Router>
        
        <Route render={({location}) => {
          console.log(location.key);
          return (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={400} classNames="page">

                <Switch location={location}>
                  <Route exact path="/" component={Index} />
                  <Route exact path="/signin" component={SignIn} />
                  <Route exact path="/signout" component={SignOut} />
                  <Route exact path="/socialsignin" component={SocialSignIn} />
                  <Route exact path="/password" component={Password} />
                  <Route exact path="/testmode" component={TestMode} />
                  <Route exact path="/users" component={Users} />
                  <Route exact path="/users/:user_id" component={UserInfo} />
                  <Route exact path="/2fa" component={TwoFactor} />
                  <Route exact path="/2fa/:method" component={TwoFactor} />
                </Switch>

              </CSSTransition>
            </TransitionGroup>
          )
        }} />
        
      </Router>
    </Fragment>
  );
}

export default App;
