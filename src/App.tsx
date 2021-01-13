import React, { Fragment, useState, Context, createContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import './style/_reset.scss';
import './style/_config.scss';
import './style/_transition.scss';

import LogoImg from './components/atoms/LogoImg';
import SignIn from './components/pages/SignIn';
import SocialSignIn from './components/pages/SocialSignIn';
import Password from './components/pages/Password';
import TestMode from './components/pages/TestMode';

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
                    <Route exact path="/">
                      <Redirect to={"/testmode"} />
                    </Route>
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/socialsignin" component={SocialSignIn} />
                    <Route exact path="/password" component={Password} />
                    <Route exact path="/testmode" component={TestMode} />
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
