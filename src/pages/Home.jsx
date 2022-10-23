
import React from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { setProductsThunk, filterProductsThunk, filterCategoryThunk } from '../store/slices/products.slice'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import cart from '../assets/images/cart6.gif'

import '../styles/home.css'



//React Bootstrap
import {
  Row,
  Card,
  Col,
  InputGroup,
  Form,
  Button,
  ListGroup,
  NavDropdown,
  Container,
  Accordion
} from "react-bootstrap";





import {  useEffect } from 'react'
import axios from 'axios';
import { addCartThunk } from '../store/slices/cart.slice';

const Home = () => {

  const [ categories, setCategories ] = useState([])


  const [ filterValue, setFilterValue ] = useState('')
  

  let navigate = useNavigate()
  const lang = useSelector( state => state.language )

  const dispatch = useDispatch()
  const products = useSelector ( state => state.products )

  useEffect(()=>{
    dispatch(setProductsThunk() )
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
      .then( res => {
        setCategories( res.data.data.categories )
        })

  },[lang])

    const filtering =( e )=> {
      dispatch(filterCategoryThunk( e.target.value ))
    }

    const sendToCart =( currentProduct )=>{
      const body = {
        id: currentProduct.id,
        quantity: 1
      }
      dispatch( addCartThunk( body ) )
      }
  

  

  return (
    
        <>
          <div className='form'>
            <InputGroup className="home_input" onChange={ event => setFilterValue( event.target.value )}>
              <Form.Control
                placeholder={lang?.searchProduct}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary"
              id="button-addon2"
              onClick={ ()=> dispatch( filterProductsThunk ( filterValue )) }
              >
                {lang?.search}
              </Button>
            </InputGroup>
          
            <Form.Select onChange={ filtering } className='select'>
              <option value={''}
              >{lang?.allProducts}</option>
              {
                categories.map( item => 
                  (
                  <option  key={item.id}
                  value={item.id}
                  >{item.name}</option>
                ) )
              }
            </Form.Select>
          </div>
            
          
            
            <div className="g-4 product_card-box">
            
              {
                products.map( item => (
                <article onClick={ () => navigate(`/productDetail/${item.id}`)}
                  key={item.id} className='product-card'>
                
                    
                  <div className="product-image">
                    <img src={item.productImgs[0]} alt="" />
                    <img src={item.productImgs[1]} alt="" className="image-first" />
                  </div>
                    

                    <div className='product-data'>
                      <h4>{item.title}</h4>
                  
                      <p>{lang.priceCard}: ${new Intl.NumberFormat().format(item.price)}</p>
                    </div>

              
                </article>
                ))
              }
            
            </div>
          
        
        </>
      
  );
};

export default Home;