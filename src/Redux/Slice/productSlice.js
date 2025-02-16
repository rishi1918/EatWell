import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
export const fetchProducts=createAsyncThunk('products/fetchProducts',async()=>{
    const result=await axios.get("https://eatzzyserver.onrender.com/products")
    return result.data

})

const productSlice=createSlice({
    name:"products",
    initialState:{
         //for response 
        allProducts:[],
        //for filtering
        allProductsDummy:[],
        //for rejected 
        error:"",
        //for pending
        loading:false,
        //searching
        searching:false

    },
    reducers: {
        searchProducts: (state, action) => {
            if (action.payload === "") {
                state.searching = false;
            } else {
                state.allProducts = [
                    ...state.allProductsDummy.filter(item =>
                        item.name.toLowerCase().includes(action.payload.toLowerCase())
                    ),
                    ...state.allProductsDummy.filter(item =>
                        item.restaurant.toLowerCase().includes(action.payload.toLowerCase())
                    )
                ];
                state.searching = true;
            }
        }
    }
    ,
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.allProducts=action.payload
            state.allProductsDummy=action.payload
            state.error=''
            state.loading=false
            state.searching=false

        })
        builder.addCase(fetchProducts.rejected,(state,action)=>{

            state.allProducts=[]
            state.allProductsDummy=[]
            state.error='Api call failed'
            state.loading=false
            state.searching=false

        })
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.allProducts=[]
            state.allProductsDummy=[]
            state.error=''
            state.loading=true
            state.searching=false

        })
    }
})

export default productSlice.reducer
export const {searchProducts} =productSlice.actions