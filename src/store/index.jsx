//Store
import { configureStore } from '@reduxjs/toolkit'
import logInSlice from './slices/logIn.slice'
import isLoading from './slices/isLoading.slice'
import productsSlice from './slices/products.slice'
import cartSlice from './slices/cart.slice'
import purchasesSlice from './slices/purchases.slice'





export default configureStore({
    reducer: {
        log:logInSlice,
        loading: isLoading,
        products: productsSlice,
        cart: cartSlice,
        purchases: purchasesSlice
    }
})

//Los slices se deben importar sin {}
