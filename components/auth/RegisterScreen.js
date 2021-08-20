import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
//import { startRegisterNameEmailPhonePasswords } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { removeError, setError } from '../../actions/ui';
import { startRegisterNameEmailPhonePasswords } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const{ msgError } = useSelector( state => state.ui );
    // const state = useSelector( state => state );

    const [ formValues, handleInputChange ] = useForm({
        name: 'Jurgen Rodriguez',
        email: 'jrgwebserve@gmail.com',
        phone: '097079176',
        password: '123456',
        password2: '123456'
    });

    const { name, email, phone, password, password2 } = formValues;

    // Manejando el Submit del Formulario
    const handleRegister = (e) => {
        e.preventDefault();
        //dispatch( startRegisterNameEmailPhonePasswords( name, email, phone, password, password2 ) );
        if ( isFormValid() ) {
        dispatch( startRegisterNameEmailPhonePasswords( name, email, phone, password, password2 ) )
            //console.log('Formulario correcto')
        }
    }

    const isFormValid = () => {
        if ( name.trim().length === 0 ) {
            dispatch( setError('Name is required') )
            return false;
        }  else if (!validator.isEmail( email )) {
            dispatch( setError('Email is not valid') )
            return false;
        }  else if ( phone < 5) { // ANALIZE ERROR
            dispatch( setError('Phone is not valid') )
            return false;
        }  else if ( password !== password2 || password < 5 ) {
            dispatch( setError('Password shluld be at least 6 characters and match each other') )
            return false
        }

        dispatch( removeError() )
        return true;
    }

    return (
        <>
            <h3 className="auth__title mb-5">Register</h3>
            <form
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    msgError &&
                    (
                        <div className="auth__alert-errors">
                            { msgError }
                        </div>
                    )
                }

                <input
                    type="text"
                    placeholder="Entire Name"
                    name="name"
                    className="auth__input mt-1"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="auth__input mt-1"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="number"
                    placeholder="Phone"
                    name="phone"
                    className="auth__input mt-1"
                    autoComplete="off"
                    value={ phone }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input mt-1"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirm"
                    className="auth__input mt-1"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

{/*
                <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    className="auth__input mt-1"
                    autoComplete="off"
                />*/}

                <button
                    type="submit"
                    className="btn btn-primary pointer btn-block mt-5 mb-5"
                    //disabled={ true }
                >
                    Register
                </button>

                <Link
                    to="/auth/login"
                    className="links"
                >
                    Already Registered?
                </Link>

            </form>
        </>
    )
}
