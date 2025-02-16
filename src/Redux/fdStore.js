import {configureStore, createReducer} from '@reduxjs/toolkit'
import productSlice from './Slice/productSlice'
import cartSlice from './Slice/cartSlice'
const fdStore=configureStore({
    reducer:{
        productReducer:productSlice,
        cartReducer:cartSlice

    }
})
export default fdStore