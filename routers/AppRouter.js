import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import { useDispatch } from 'react-redux';

import { firebase } from '../firbase/firebase-config';
import LoadingScreen from 'react-loading-screen'
import { AuthRouter } from './AuthRouter'
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { JournalScreen } from '../components/journal/JournalScreen'
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();   // Para cuando cambie el estado de la app no desaparezca a auth del usuario

    const [checking, setChecking] = useState(true)   // Para que la app sepa automaticamente cuando un usuario esta logged y llevarlo al Journal|| y cuando no.
    const [isLoggedIn, setIsLoggedIn] = useState(false)    // Para rutas privadas y publicas

    useEffect(() => {

      firebase.auth().onAuthStateChanged( async (user) => {
        if ( user?.uid ) {
            dispatch( login( user.uid, user.displayName ) );
            setIsLoggedIn( true );

            dispatch( startLoadingNotes( user.uid ) );

        } else {
            setIsLoggedIn( false );
        }

        setChecking(false);   /// ya tengo la respuesta, ya terminó
      })

    }, [ dispatch, setChecking, setIsLoggedIn ])

    if ( checking ) {
      return (
          <LoadingScreen
            loading={true}
            bgColor='#f1f1f1'
            spinnerColor='#5C62C5'
            textColor='#36363'
            //logoSrc='/logo.png'
            text='Please wait...'
          >

            <div></div>
          </LoadingScreen>
      )
    }

    return (
        <Router>
          <div>
            <Switch>
                <PublicRoute
                  path="/auth"
                  component={ AuthRouter }
                  isAuthenticated={ isLoggedIn }
                />

                {/*MAIN ROUTE*/}
                <PrivateRoute
                  exact
                  isAuthenticated={ isLoggedIn }
                  path="/"
                  component={ JournalScreen }
                />

                <Redirect to="/auth/login" />
            </Switch>
          </div>
        </Router>


    )
}
