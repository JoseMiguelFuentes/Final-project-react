
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/purchases.css'

const PurchaseItem = ({products, itemDate}) => {


  const lang = useSelector( state => state.language )
  let idioma = lang?.name == 'english' ? 'en-us' : 'es-mx'
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
  const date = new Date(itemDate).toLocaleDateString( idioma, options)

  

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
            <p>{lang.price} ${new Intl.NumberFormat().format(product.price)}</p>
          <p>{lang.quantity}: {product.productsInCart.quantity}</p>
          <p>{lang.subtotal}: ${new Intl.NumberFormat().format(product.price * product.productsInCart.quantity)}</p>
          </div>
          ))
        }
        <h1>{lang.total}: ${ getTotal(products) }  </h1>
    </div>
  );
};

export default PurchaseItem;