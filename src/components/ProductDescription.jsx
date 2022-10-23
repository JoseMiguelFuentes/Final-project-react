
import React, { useState,useEffect } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { addCartThunk } from '../store/slices/cart.slice';
import    '../styles/currentProduct.css'




const ProductDescription = ({currentProduct}) => {
  const [ quantity, setQuantity ] = useState( 1 )
  const [open, setOpen] = useState(false) 


  const dispatch = useDispatch()

  const sendToCart =( )=>{
      
    const body = {
      id: currentProduct.id,
      quantity
    }
    dispatch( addCartThunk( body, lang.createErrorTitle, lang.createErrorText, lang.ProductSentError ) )
    setQuantity(1)
    Swal.fire(
      {title: lang.ready,
      text: lang.ProductSent,
      icon:'success',
      confirmButtonColor: '#50524f',
      toast:true, 
    })
    
  }

  const lang = useSelector( state => state.language )

  return (
    <div>
      <article className='section1'>
            <Button
              onClick={() => setOpen(!open)}
              className='description__btn'
              aria-controls="example-collapse-text"
              aria-expanded={open}>
                Description
            </Button>
            <div>
              <Collapse in={open} dimension="height">
                <div id="example-collapse-text">
                  <div body style={{ width: '60%', marginRight: 'auto', marginLeft: 'auto', paddingTop: '1%' }}>
                    <p>{currentProduct?.description}</p>
                    <div className='quantity'>
                      <div className='quantity-name'>{lang.quantity}</div>
                      <div className='quantity-data'>

                        <button className='turn-quantity'
                        disabled={quantity === 1}
                        onClick={ ()=> setQuantity( quantity - 1)}
                        >
                          -
                          </button>
                        <p className='quantity-number'>{quantity}</p>
                        <button 
                        className='turn-quantity'
                        onClick={ ()=> setQuantity( quantity + 1)}>
                          +
                          </button>
                      </div>
                    </div>
                    <div className='buy' onClick={ sendToCart }>
                        {lang.addToCart}
                    </div>

                    <div className='box-price'>
                      <div className='price'>
                        {lang.price}{currentProduct?.price} / {lang.total}{quantity * currentProduct?.price}
                      </div>
                    </div>

                  </div>
                  
                </div>
              </Collapse>
            </div>
            
          </article>
    </div>
  );
};

export default ProductDescription;