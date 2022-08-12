
import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { signUpThunk } from '../store/slices/logIn.slice';

const CreateUser = () => {


  const { handleSubmit, register, reset} = useForm( {} )
  const navigate = useNavigate()
  const dispatch = useDispatch()
//   {
//     "firstName": "Max",
//     "lastName": "Rangel",
//     "email": "max@gmail.com",
//     "password": "pass1234",
//     "phone": "1234567891",
//     "role": "admin"
// }

// let initialData = {
//   "firstName": "",
//   "lastName": "",
//   "email": "",
//   "password": "",
//   "phone": "",
//   "role": "admin"
// }
  
//    reset( {
//   "firstName": "",
//   "lastName": "",
//   "email": "",
//   "password": "",
//   "phone": "",
//   "role": "admin"
// } )





  const submit =(data)=>{
    data.role = "admin"
    // axios.post( `https://ecommerce-api-react.herokuapp.com/api/v1/users`, data )
    dispatch( signUpThunk( data ) )
     navigate( -1 ) 
    
    console.log(data)
  }


  return (
    <div>
      <Card style={{ width: '40%', padding: '1%' }} className='card-login'>
      <Form onSubmit={handleSubmit(submit)}>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">FirstName</InputGroup.Text>
          <Form.Control
            aria-label="firstName"
            aria-describedby="inputGroup-sizing-sm"
            {...register('firstName')}
            required={true}
          />
          
          <InputGroup.Text id="inputGroup-sizing-sm">LastName</InputGroup.Text>
          <Form.Control
            aria-label="lastName"
            aria-describedby="inputGroup-sizing-sm"
            {...register('lastName')}
            required={true}
          />
        </InputGroup>

        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text>
          <Form.Control
            aria-label="email"
            aria-describedby="inputGroup-sizing-sm"
            type='email'
            {...register('email')}
            required={true}
          />

          <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
            <Form.Control
              aria-label="password"
              aria-describedby="inputGroup-sizing-sm"
              type='password'
              {...register('password')}
              required={true}
              minLength={8}
              maxLength={8}
            />

          </InputGroup>

          

          <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Phone</InputGroup.Text>
          <Form.Control
            aria-label="email"
            aria-describedby="inputGroup-sizing-sm"
            type='text'
            {...register('phone')}
            placeholder='10 characteres'
            minLength={10}
            maxLength={10}
            required={true}
          />

          </InputGroup>
          <Button type='submit' >Create account</Button>
        </Form>
    </Card>
    </div>
  );
};

export default CreateUser;