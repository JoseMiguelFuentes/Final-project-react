
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import '../styles/login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


const Login = () => {

  const { handleSubmit, register, reset} = useForm()
  let Navigate = useNavigate()


  const submit =( data  )=>{
    // console.log(data);
    axios.post( 'https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data )
    .then( res => {
      // console.log(res.data)
      localStorage.setItem( "token", res.data.data.token )
      localStorage.setItem( "userName", res.data.data.user.firstName +' '+res.data.data.user.lastName )
      
      Navigate ('/')
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          alert("Credenciales inválidas")
        }
        console.error(error.response)
      })
        reset({
          email: "joe@gmail.com",
          password: "fuentes123"
        })
        
  }
  // useEffect(()=>{
  //   localStorage.setItem( "token", logData?.token)
  //   localStorage.setItem( "userName", logData.user?.firstName)
  //   const userName = logData.user?.firstName
  //   console.log( userName )
  // },[logData])
  



  return (
    <div>
      
      <Card style={{ width: '18rem' }} className='card-login'>
        <Form onSubmit={ handleSubmit ( submit )}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" 
          { ...register('email') }
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
          { ...register('password') }
          />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
    </div>
  );
};

export default Login;