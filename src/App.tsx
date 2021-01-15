import React, { Fragment, useState, Context, createContext } from 'react';
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
import TwoFactor from './components/pages/TwoFactor';

// TODO: Fix later
interface AppSessionData {
  login?: {
    username: string;
    twoFactorType?: string;
  }
}

interface AppSessionObject {
  session?: AppSessionData;
  setSession?: (session: AppSessionData) => void;
}

export const AppSession: Context<AppSessionObject> = createContext({});

function App() {
  const [session, setSession] = useState({});

  return (
    <AppSession.Provider value={{
      session,
      setSession
    }}>
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
                    <Route exact path="/2fa" component={TwoFactor} />
                  </Switch>

                </CSSTransition>
              </TransitionGroup>
            )
          }} />
          
        </Router>
      </Fragment>
    </AppSession.Provider>
  );
}

export default App;
