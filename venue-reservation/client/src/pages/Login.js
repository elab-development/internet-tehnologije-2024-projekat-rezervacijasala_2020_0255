import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import { setLogin } from '../state';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};

const Login = () => {
  const [pageType, setPageType] = useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';

  const register = async (values, onSubmitProps) => {
    await axios.post('http://localhost:8000/api/auth/register', {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });
    onSubmitProps.resetForm();
    setPageType('login');
  };

  const login = async (values, onSubmitProps) => {
    const loggedInUserResponse = await axios.post(
      'http://localhost:8000/api/auth/login',
      {
        email: values.email,
        password: values.password,
      }
    );

    const loggedIn = await loggedInUserResponse.data;

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate('/');
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <section className='visit' id='visit'>
      <h1 className='heading'>
        {pageType === 'login' ? 'Welcome Back!' : 'Become our Member!'}
      </h1>

      <div className='row'>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
          validationSchema={isLogin ? loginSchema : registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <h3>{pageType === 'login' ? 'Login' : 'Register'}</h3>
              {isRegister && (
                <>
                  <div className='inputBox'>
                    <input
                      type='text'
                      placeholder='First name'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name='firstName'
                    />
                    <span className='errorText'>
                      {errors.firstName &&
                        touched.firstName &&
                        errors.firstName}
                    </span>
                  </div>

                  <div className='inputBox'>
                    <input
                      type='text'
                      placeholder='Last name'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name='lastName'
                    />
                    <span className='errorText'>
                      {errors.lastName && touched.lastName && errors.lastName}
                    </span>
                  </div>
                </>
              )}

              <div className='inputBox'>
                <input
                  type='text'
                  placeholder='Email'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name='email'
                />
                <span className='errorText'>
                  {errors.email && touched.email && errors.email}
                </span>
              </div>

              <div className='inputBox'>
                <input
                  type='password'
                  placeholder='Password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name='password'
                />
                <span className='errorText'>
                  {errors.password && touched.password && errors.password}
                </span>
              </div>
              <button type='submit' className='btn'>
                {isLogin ? 'Login' : 'Register'}
              </button>
              <p
                onClick={() => {
                  setPageType(isLogin ? 'register' : 'login');
                  resetForm();
                }}
                className='formToggler'
              >
                {isLogin
                  ? "Nemate nalog? Prijavite se ovde."
                  : 'Već imate nalog? Prijavite se ovde.'}
              </p>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Login;
