//Store
import { configureStore } from '@reduxjs/toolkit'
import isLoading from './slices/isLoading.slice'
import productsSlice from './slices/products.slice'
import cartSlice from './slices/cart.slice'
import purchasesSlice from './slices/purchases.slice'
import languageSlice from './slices/language.slice'





export default configureStore({
    reducer: {
        loading: isLoading,
        products: productsSlice,
        cart: cartSlice,
        purchases: purchasesSlice,        
        language: languageSlice
    }
})

//Los slices se deben importar sin {}
