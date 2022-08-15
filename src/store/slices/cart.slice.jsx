

import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios'
import getConfig from '../../utils/getConfig';
import Swal from 'sweetalert2';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
      setCart: (state, action)=>{
        let cart = action.payload
        return cart
      }
    }
})
export const { setCart } = cartSlice.actions;

export const getCartThunk = ( ) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get( `https://ecommerce-api-react.herokuapp.com/api/v1/cart`, getConfig() )
      .then((res) => dispatch( setCart( res.data.data.cart.products )))
      .catch( error => console.error( error.response ))
      .finally(() => dispatch(setIsLoading(false)))
}

export const addCartThunk = (data, titleE, textE, footerE) => (dispatch) => {
    // dispatch(setIsLoading(true));
    return axios.post( `https://ecommerce-api-react.herokuapp.com/api/v1/cart`, data, getConfig() )
        .then((res) => {
          if (res.status === 201) {
            dispatch( getCartThunk() )
             
          }
        })
        .catch( error => {
          if (error.response.status === 400) {
            Swal.fire(
              {
                icon: 'error',
                title: titleE,
                text: textE,
                footer: footerE,
                confirmButtonColor: '#50524f',
                toast:true, 
            })
          }
        })
        
        // .finally(() => dispatch(setIsLoading(false)));
}
export const removeCartProductThunk = (id) => (dispatch) => {
  // dispatch(setIsLoading(true));
  return axios.delete( `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig() )
      .then(() => dispatch( getCartThunk() ))
      // .finally(() => dispatch(setIsLoading(false)));
}

export const buyCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post( `https://ecommerce-api-react.herokuapp.com/api/v1/purchases`, {}, getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}


export default cartSlice.reducer

