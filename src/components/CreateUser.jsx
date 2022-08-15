
import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'

import Swal from 'sweetalert2';

const CreateUser = () => {


  const { handleSubmit, register, reset} = useForm( {} )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const lang = useSelector( state => state.language )






  const submit =(data)=>{
    data.role = "admin"
    axios.post( `https://ecommerce-api-react.herokuapp.com/api/v1/users`, data )
        .then((res) => {
            if (res.status === 201 ) {
                Swal.fire({
                    icon: 'success',
                    title: lang?.createTitle,
                    text: lang?.userCreated,
                    footer: lang?.createFooter
                })
                navigate( -1 )
            }
        })
        
        .catch((error) => {
            if (error.response?.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: lang.createErrorTitle,
                    text: lang.createErrorText,
                    footer: lang.createErrorFooter,
                  })
            }
          })
      
    
  }


  return (
    <div>
      <Card style={{ width: '45%', padding: '1%' }} className='card-login'>
      <Form onSubmit={handleSubmit(submit)}>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">{lang?.firstName}</InputGroup.Text>
          <Form.Control
            aria-label="firstName"
            aria-describedby="inputGroup-sizing-sm"
            {...register('firstName')}
            required={true}
            placeholder={lang?.firstName}
          />
          
          <InputGroup.Text id="inputGroup-sizing-sm">{lang.lastName}</InputGroup.Text>
          <Form.Control
            aria-label="lastName"
            aria-describedby="inputGroup-sizing-sm"
            {...register('lastName')}
            required={true}
            placeholder={lang?.FormlastName}
          />
        </InputGroup>

        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">{lang?.email}</InputGroup.Text>
          <Form.Control
            aria-label="email"
            aria-describedby="inputGroup-sizing-sm"
            type='email'
            {...register('email')}
            required={true}
            placeholder={lang?.emailPlace}
          />

          <InputGroup.Text id="inputGroup-sizing-sm">{lang?.password}</InputGroup.Text>
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
          <InputGroup.Text id="inputGroup-sizing-sm">{lang?.phone}</InputGroup.Text>
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
  <Button type='submit' >{lang?.createAccount}</Button>
        </Form>
    </Card>
    </div>
  );
};

export default CreateUser;


