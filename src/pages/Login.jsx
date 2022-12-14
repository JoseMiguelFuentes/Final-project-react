
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import '../styles/login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

//Translation



const Login = () => {

  const { handleSubmit, register, reset} = useForm()
  let Navigate = useNavigate()
  const lang = useSelector( state => state.language )


  const submit =( data  )=>{
    axios.post( 'https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data )
    .then( res => {
      localStorage.setItem( "token", res.data.data.token )
      localStorage.setItem( "firstName", res.data.data.user.firstName )
      localStorage.setItem( "lastName", res.data.data.user.lastName )
      
      Navigate ('/')
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      let signInSuccess = localStorage.getItem( "firstName")+' '+ lang.logInSuccess
      Toast.fire({
        icon: 'success',
        title: signInSuccess
        
      })
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          Swal.fire(
            {
              icon: 'error',
              title: lang.logInErrorTitle,
              text: lang.logInErrorText,
              footer: lang.logInErrorFooter,
              confirmButtonColor: '#50524f',
              toast:true, 
          })
        }
        console.error(error.response)
      })
        reset({
          email: "joe@gmail.com",
          password: "fuentes123"
        })
  }

  
  
  



  return (
    <div>
      
      <Card style={{ width: '18rem' }} className='card-login'>
        <Form onSubmit={ handleSubmit ( submit )}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{lang.emailAddress}</Form.Label>
          <Form.Control type="email" placeholder={lang?.enterEmail} 
          { ...register('email') }
          />
          <Form.Text className="text-muted">
            {lang.neverShare}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{lang?.password}</Form.Label>
          <Form.Control type="password" placeholder={lang?.password}
          { ...register('password') }
          />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          {lang?.singIn}
        </Button>

        <p id='create-user' 
        className='noAccount'
        >{lang?.noAccount}</p>

        <p id='create-user' 
        className='create-user'
        onClick={()=>{Navigate('/createUser') }}
        >{lang?.createOne}</p>


      </Form>
    </Card>
    </div>
  );
};

export default Login;