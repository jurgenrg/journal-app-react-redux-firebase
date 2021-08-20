import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui)

    const [ formValues, handleInputChange ] = useForm({
        email: 'jrgwebserve@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    // Manejando el Submit del Formulario
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLoginEmailPassword( email, password ) );
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() )
    }

    return (
        <>
            <h3 className="auth__title mb-5">Login</h3>
            <form
                onSubmit={ handleLogin }
                className="animate__animated animate__fadeIn animate__faster"
            >

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input mt-1"
                    value={ password  }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary pointer btn-block mt-5"
                    disabled={ loading }
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login através de Social Networks</p>

                    <div
                        className="google-btn mb-1"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>

                    <div
                        className="facebook-btn"
                    >
                        <div className="facebook-icon-wrapper">
                            <img className="facebook-icon" src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="facebook button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with facebook</b>
                        </p>
                    </div>

                </div>

                <Link
                    to="/auth/register"
                    className="links"
                >
                    Create new account
                </Link>

            </form>
        </>
    )
}
