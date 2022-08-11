

import React from 'react';
import { useState, useEffect  } from 'react';
import axios from 'axios';
import { Nav, Container, Navbar, Button, Offcanvas } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import  { filterCategoryThunk, setProductsThunk }  from '../store/slices/products.slice';
import { useDispatch } from 'react-redux';
import Cart from './Cart';

const NavBar = () => {

  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  // const token = localStorage.getItem( "token" )

  const handleShow = () => {
    if ( token ) {
      setShow(true)
    }else{
      navigate("/login")
    }
    
    }
  const navigate = useNavigate()

  
  const logOut = ()=> {
     localStorage.setItem("token", "" )
     localStorage.setItem("userName", "" )
     navigate("/login") 
    }
  const token = localStorage.getItem( "token" )
  const userName = localStorage.getItem( "userName" )
  
    


  return (
    <div>
      <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Brand href="/#/">{ userName ? 'Wellcome '+userName : 'My store'}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#/">Home</Nav.Link>
            
            <Nav.Link href="/#/purchases">Purchases</Nav.Link>
             
            {
             token ? (<Nav.Link  onClick={logOut}>Log Out</Nav.Link>) : (<Nav.Link href="/#/login">Login</Nav.Link>)
            }

              
            <button variant="primary" onClick={handleShow} id='cart-button'>
              Cart
            </button>

            <Nav.Link href="/#/">{ userName ? null : 'Sign Up'}</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Cart show={show} handleClose={handleClose}
    handleShow={handleShow}
    />
    </div>
  );
};

export default NavBar;