
import { createSlice } from '@reduxjs/toolkit';
import   english  from '../../languages/en-US.json'
import   spanish  from '../../languages/es-MX.json'



export const languageSlice = createSlice(
  
  {
    name: 'language',
    initialState: {},
    reducers: {
      setLanguage: ( state, action ) =>{
        let language = action.payload
        return language
      }
    }
})

export const { setLanguage } = languageSlice.actions;

export const setlanguageThunk = ( data ) => (dispatch) => {
    return (() => dispatch( setLanguage ( data )))
}

export default languageSlice.reducer;
