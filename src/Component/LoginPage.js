import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setPassword, loginSuccess, loginFailure } from '../Reducer/loginSlice';
import { useNavigate } from 'react-router-dom';
import './loginpage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector((state) => state.login.username);
    const password = useSelector((state) => state.login.password);
    const error = useSelector((state) => state.login.error);

    const handleLogin = (e) => {
        e.preventDefault();
        const isUsernameValid = username.trim() !== '';
        const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);

        if (!isUsernameValid) {
            dispatch(loginFailure('Username is required.'));
        } else if (!isPasswordValid) {
            dispatch(loginFailure('Password must be at least 8 characters and include one letter, one number, and one special character.'));
        } else {
            dispatch(loginSuccess());
            navigate('/LifeStyle');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => dispatch(setUsername(e.target.value))} className="login-input"/>
                    {!username && error?.includes('Username') && (
                        <p className="error-message">{error}</p>
                    )}
                </div>

                <div className="input-group">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => dispatch(setPassword(e.target.value))} className="login-input"/>
                    {username && error?.includes('Password') && (
                        <p className="error-message">{error}</p>
                    )}
                </div>

                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
