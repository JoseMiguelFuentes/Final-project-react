
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const logIn = createSlice({
    name: 'Log',
    initialState: null,
    reducers: {

    }
})

export const {  } = logIn.actions;


export const signUpThunk = (data) => (dispatch) => {
    // dispatch(setIsLoading(true));
    return axios.post( `https://ecommerce-api-react.herokuapp.com/api/v1/users`, data )
        // .then(() => dispatch(/* action */))
        // .finally(() => dispatch(setIsLoading(false)));
}

export default logIn.reducer;
