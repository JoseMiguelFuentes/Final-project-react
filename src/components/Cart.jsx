
import React from 'react';
import Swal from 'sweetalert2'

import { useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { buyCartThunk, getCartThunk, removeCartProductThunk } from '../store/slices/cart.slice';

const Cart = ({show, handleClose, handleShow}) => {

  const cartProducts = useSelector( state => state.cart )
  const dispatch = useDispatch()

  useEffect(()=>{
    
      dispatch(getCartThunk())
    
  },[])
  // console.log(cartProducts)

  const navigate = useNavigate()

  const getTotal =( products  ) => {
    let total = 0
    products?.forEach( product => {
      total += product.price * product.productsInCart.quantity
    })
     return new Intl.NumberFormat().format(total)
  }
  const getQuantity =( products  ) => {
    let quantity = 0
    products?.forEach( product => {
      quantity += Number(product.productsInCart.quantity)
    })
    return new Intl.NumberFormat().format( quantity )
  }

  // ()=> dispatch(removeCartProductThunk(item.id))

  const retireProduct =( id ) => {
    
     
      Swal.fire({
        title: ` ${localStorage.getItem
          ('firstName')+' '+localStorage.getItem
          ('lastName')}`,
        text: 'Do you really want to remove this product from the cart',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#50524f',
        confirmButtonText: 'Remove!',
        footer: " <p class='red'>  You can't add it back</p>",
        toast: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removeCartProductThunk( id ))
          Swal.fire(
            {title:'Removed!',
            text:'Your product has been Removed.',
            icon:'success',
            confirmButtonColor: '#50524f',
            toast:true, 
          })
          
        }
      })
    }
    const buy =()=>{
      dispatch(buyCartThunk( ))
      Swal.fire(
        {title:'Ready!',
        text:'Thanks for your purchase.',
        icon:'success',
        confirmButtonColor: '#50524f',
        toast:true, 
      })
    }
    
  


  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement='end' >
        <Offcanvas.Header closeButton>
  <Offcanvas.Title>{  localStorage.getItem( "firstName" )+"'s Shopping cart"}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='buy' onClick={ buy } style={{display: 'inline-block'}}>
                            Buy
            </div>
          <h4>Total: ${getTotal( cartProducts )}</h4>
          <p>Quantity: ( {getQuantity( cartProducts )} )</p>
          
        
          {
            cartProducts.map( item => (
              <div key={item.id} className='cart-item'>
                <p onClick={ ()=> navigate(`/productDetail/${item.id}` )}>{item.title}   ${new Intl.NumberFormat().format(item.price)}</p>
                <p>{item.productsInCart.quantity}</p>
                <div className='buy' onClick={()=> retireProduct( item.id ) }>
                  Remove
                    </div>
                
          
              </div>
            ) )
          }
          
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Cart;