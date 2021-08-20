import Swal from 'sweetalert2';

import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firbase/firebase-config';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';


// First async function
export const startLoginEmailPassword = ( email, password ) => {
    return (dispatch) => {  // retorna un callBack

        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                dispatch(login( user.uid, user.displayName ));

                dispatch( finishLoading() );
                //Swal.fire({
                //  icon: 'success',
                //  title: 'Have a nice day',
                //  showConfirmButton: false,
                //  timer: 1500
                //})
            })
            .catch (e => {
                console.log(e)
                dispatch( finishLoading() );
                Swal.fire( 'Error', e.message, 'error' );
            })

        //setTimeout(() => {
        //    dispatch( login(123, 'Pedro') )
        //}, 3500);

    }
}
export const startRegisterNameEmailPhonePasswords = ( name, email, phone, password, password2 ) => {
    return (dispatch) => {  // retorna un callBack

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async ({ user }) => {

                await user.updateProfile({ displayName: name,  })

                dispatch(
                    login( user.uid, user.displayName )
                )
            })
            .catch (e => {
                console.log(e)

            })
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {

        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            })
            //.then( userCred => {
            //    console.log( userCred );
            //})

    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const register = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( noteLogout() );
    }
}

export const logout = () => ({
    type: types.logout
})