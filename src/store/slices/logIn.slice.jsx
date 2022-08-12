
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

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
        .then((res) => {
            if (res.status === 201 ) {
                Swal.fire({
                    icon: 'success',
                    title: 'Well..',
                    text: 'User created!',
                    footer: 'Use your email and password to log in'
                })
            }
        })
        
        .catch((error) => {
            if (error.response?.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: 'Maybe the user already exists'
                  })
            }
            console.error(error.response)
          })
        // .finally(() => dispatch(setIsLoading(false)));
}

export default logIn.reducer;
