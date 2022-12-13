import { useState, useEffect } from 'react';
import { Form, Navigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import FormInput from '../components/FormInput.jsx';
import Button from '../components/Button.jsx';

import Auth from '../api/auth.js';

import AppConfig from '../config/app.js';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [status, setStatus] = useState(null);

  const submitFormAsync = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    setStatus({
      color: 'gray-400',
      content: 'Memproses login'
    });

    try {
      await Auth.login({
        username: formData.get('username'),
        password: formData.get('password'),
      });

      setStatus({ authenticated: true });
    } catch (error) {
      console.log(error);
      setStatus({
        color: 'red-400',
        content: 'Login Gagal'
      });

      setTimeout(() => setStatus(null), 3000);
    }
  };

  useEffect(() => {
    document.title = 'UJIANN | Login';
  });

  return (
    <div>
      { status?.authenticated ? <Navigate to="/dashboard" replace="true" /> : '' }
      <div className="flex-col w-full pb-24 pt-14 text-center bg-gradient-to-tr from-blue-400 to-green-400 text-white">
        <FontAwesomeIcon icon={faUser} className="text-5xl mb-2"/>
        <h2 className="text-2xl">Selamat Datang</h2>
      </div>
      <div className="bg-white rounded-xl p-8 -mt-12 md:shadow-lg mx-auto max-w-md">
        <h1 className="text-xl text-center mt-3 mb-14">Login</h1>
        <form onSubmit={submitFormAsync}>
          <p className={'mb-4 text-center text-' + status?.color }>{status?.content}</p>
          <FormInput
            type="text"
            name="username"
            placeholder="Username"
            fullwidth
            iconStart={faUser}
            className="mb-5"
            required />
          <FormInput
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            fullwidth
            iconStart={faLock}
            iconEnd={passwordVisible ? faEyeSlash : faEye}
            iconEndClick={() => setPasswordVisible(!passwordVisible)}
            required />
          <Button
            type="submit"
            text="Login"
            className={'mt-8 w-full mb-3 '} />
        </form>
      </div>
    </div>
  );
}
