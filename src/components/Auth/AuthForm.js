
import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {


    const history = useHistory();
    const emailInputRef = useRef();
    const passInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const submitHandler = (event) => {

        event.preventDefault();

        const email = emailInputRef.current.value;
        const password = passInputRef.current.value;

        setIsLoading(true);
        let url;
        if (isLogin) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyIBMKzSsab6UhqOdFOidQshEvfUbjy1k"
        }
        else {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyIBMKzSsab6UhqOdFOidQshEvfUbjy1k"
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {

                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                }
                else {
                    return res.json().then((data) => {

                        throw new Error("Authetication failed! ");

                    })
                }
            })
            .then((data) => {

                const expirationTime = new Date(
                    new Date().getTime() + data.expiresIn * 1000
                );

                authCtx.login(data.idToken, expirationTime.toISOString());
                history.replace('/')
            })
            .catch((err) => {
                alert(err.message);
            })
    };


    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    }


    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        id="email"
                        ref={emailInputRef}></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password" required ref={passInputRef} />
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? 'Login' : 'Yeni Kullanıcı Oluştur'}</button>
                    )}
                    {isLoading && <p>İstek cevap bekliyor....</p>}
                    <button type='button' className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Yeni Kullanıcı Oluştur' : 'Giriş Yap'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AuthForm;