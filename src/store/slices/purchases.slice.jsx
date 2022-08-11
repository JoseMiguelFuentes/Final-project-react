
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig'

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
      setPurchases: (state, action)=>{
        let purchases = action.payload
        return purchases
      }
    }
})


export const getPurchasesThunk = () => (dispatch) => {
    // dispatch(setIsLoading(true));
    return axios.get( `https://ecommerce-api-react.herokuapp.com/api/v1/purchases`, getConfig() )
        .then( res => dispatch(setPurchases( res.data.data.purchases)))
        // .finally(() => dispatch(setIsLoading(false)));
}


export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
