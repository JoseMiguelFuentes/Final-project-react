
import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
  export const productsSlice = createSlice({
      name: 'Products',
      initialState: [],
      reducers: {
        setProducts: (state, action)=>{
          let products = action.payload
          return products
        }
      }
  })

  export const { setProducts } = productsSlice.actions;

export const setProductsThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
        .then((res) => dispatch(setProducts( res.data.data.products  )))
        .finally(() => dispatch(setIsLoading(false)));
}

  export const filterProductsThunk = ( value ) => (dispatch) => {
      dispatch(setIsLoading(true));
      return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${value}` )
          .then((res) => dispatch(setProducts( res.data.data.products )))
          .finally(() => dispatch(setIsLoading(false)));
  }

  export const filterCategoryThunk = (id) => (dispatch) => {
      dispatch(setIsLoading(true));
      return axios.get( `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}` )
          .then((res) => dispatch( setProducts( res.data.data.products )))
          .finally(() => dispatch(setIsLoading(false)));
  }



export default productsSlice.reducer;
