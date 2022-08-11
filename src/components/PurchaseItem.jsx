
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../styles/purchases.css'

const PurchaseItem = ({products, itemDate}) => {

  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(itemDate).toLocaleDateString('en-us', options)



  const getTotal =( productS  ) => {
      let total = 0
      productS?.forEach( product => {
        total += product.price * product.productsInCart.quantity
      })
       return new Intl.NumberFormat().format(total)
  }
  

  return (
    <div >
      <p><u>{ date }</u></p>
        {
          products.map( product => (
          <div key={product.id} className='purchase-item'>
            <p>{product.title}</p>
            <p>Price ${new Intl.NumberFormat().format(product.price)}</p>
          <p>Quantity: {product.productsInCart.quantity}</p>
          <p>Subtotal: ${new Intl.NumberFormat().format(product.price * product.productsInCart.quantity)}</p>
          </div>
          ))
        }
        <h1>Total: ${ getTotal(products) }  </h1>
    </div>
  );
};

export default PurchaseItem;