

import React from 'react';
import { useState, useEffect,   } from 'react';
import axios from 'axios';
import { Nav, Container, Navbar, Button,  Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import  { filterCategoryThunk, setProductsThunk }  from '../store/slices/products.slice';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './Cart';

//Translation
import  spanish  from '../languages/es-MX.json'
import   english  from '../languages/en-US.json'
import SpainFlag from '../assets/images/spain.png'
import UkFlag from '../assets/images/united-kingdom.png'
import { setLanguage, setlanguageThunk } from '../store/slices/language.slice';


const NavBar = () => {

  const [ currentLanguage, setCurrentLanguage ] = useState( english )



  
  const [ flag, setFlag ] = useState( undefined )
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch()


  const lang = useSelector( state => state.language )
  


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
     localStorage.setItem("firstName", "" )
     localStorage.setItem("lastName", "" )
     navigate("/login") 
    }
  const token = localStorage.getItem( "token" )
  const firstName = localStorage.getItem( "firstName" )
  const lastName = localStorage.getItem( "lastName" )
  
  useEffect(()=>{
    if ( localStorage.getItem("Languaje") === "english" ) {
      dispatch( setLanguage( english ) )
      setFlag( SpainFlag )
    }else{
      dispatch( setLanguage( spanish ) )
      setFlag( UkFlag )
    }
    
  },[  ])

  const changeLang = ()=> {
    let langName = lang.name
    if ( langName === 'english' ) {
      setFlag(UkFlag)
      dispatch( setLanguage( spanish ) )
      localStorage.setItem("Languaje", "spanish")
    }
    else{
      setCurrentLanguage( english )
      dispatch( setLanguage( english ) )
      setFlag(SpainFlag)
      localStorage.setItem("Languaje", "english")
    }
   
    
  }

    

  return (
    
      <div>
        <Navbar bg="light" expand="sm" >
        <Container>
        { firstName ?
          <Navbar.Brand >
            {lang?.welcome}
           </Navbar.Brand>
           : 
           <Navbar.Brand href="/#/">
            {lang?.myStore}
           </Navbar.Brand>
           }
        {firstName && 
        <Navbar.Brand >
          {firstName+' '+lastName}
        </Navbar.Brand>
       
        }
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
      <Nav.Link href="/#/">{lang?.home}</Nav.Link>
              
      <Nav.Link href="/#/purchases">{lang?.purchases}</Nav.Link>
              
              {
              token ? (<Nav.Link  onClick={logOut}>{lang?.logOut}</Nav.Link>) : (<Nav.Link href="/#/login">{lang?.logIn}</Nav.Link>)
              }

              
              <button variant="primary" onClick={handleShow} id='cart-button'>
                {lang?.cart}
              </button>

              <Nav.Link href="/#/">{ firstName ? null : lang.singUp }</Nav.Link>
               
                
                <Nav.Link className='mr-5'>
                  <button className='flag' onClick={()=> changeLang ()}>
                    <Image fluid={true} rounded={true} src={flag} alt="flag"/>
                  </button>
                </Nav.Link>
                
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart show={show} handleClose={handleClose}
      handleShow={handleShow}
      />
      </div>
  )
}

export default NavBar;