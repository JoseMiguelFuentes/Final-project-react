
import React from 'react';
import Swal from 'sweetalert2'

import { useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { buyCartThunk, getCartThunk, removeCartProductThunk } from '../store/slices/cart.slice';



const Cart = ({show, handleClose, handleShow}) => {

  const lang = useSelector( state => state.language )
  const cartProducts = useSelector( state => state.cart )
  const dispatch = useDispatch()

  useEffect(()=>{

      dispatch(getCartThunk())
    
  },[localStorage.getItem("token")])
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
        text: lang?.removeMessage,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#50524f',
        cancelButtonText: lang?.removeCancel,
        confirmButtonText: lang.remove,
        footer: `<p class='red'>  ${lang.removeWarning}</p>`,
        toast: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removeCartProductThunk( id ))
          Swal.fire(
            {title:lang.removed,
            text: lang.productRemoved,
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
        {title: lang.ready,
        text: lang.thanks,
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
          {lang?.buy}
            </div>
          <h4>Total: ${getTotal( cartProducts )}</h4>
          <p>{lang?.quantity}: ( {getQuantity( cartProducts )} )</p>
          
        
          {
            cartProducts.map( item => (
              <div key={item.id} className='cart-item'>
                <p onClick={ ()=> navigate(`/productDetail/${item.id}` )}>{item.title}   ${new Intl.NumberFormat().format(item.price)}</p>
                <p>{item.productsInCart.quantity}</p>
                <div className='buy' onClick={()=> retireProduct( item.id ) }>
                  {lang?.remove}
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