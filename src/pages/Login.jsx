
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import '../styles/login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';


const Login = () => {

  const { handleSubmit, register, reset} = useForm()
  let Navigate = useNavigate()
  let [over, setOver]= useState(false)


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
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          Swal.fire(
            {
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'Wrong email or password',
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
//   const [pStyle, setPStyle] = useState('')
  
// useEffect(()=>{
//   if(over){
//     setPStyle ( 'create-user')
//   }
//   else{
//     setPStyle('')
//   }
// },[over])
  
  
  



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
        <p id='create-user' 
        className='create-user'
        onClick={()=>{Navigate('/createUser') }}
        >Don't have an acount?</p>
      </Form>
    </Card>
    </div>
  );
};

export default Login;