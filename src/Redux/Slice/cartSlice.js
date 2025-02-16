import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addtoCart:(state,action)=>{
                state.push({...action.payload,quantity:1,totalPrice:action.payload.price})  
        } ,
        incrementQuantity:(state,action)=>{
          const  existingProduct=state.find(pro=>pro.id==action.payload.id)
            existingProduct.quantity+=1
            existingProduct.totalPrice=parseFloat(existingProduct.quantity*existingProduct.price).toFixed(2)
            const reminingProducts=state.filter(pro=>pro.id!=existingProduct.id)
            state=[...reminingProducts,existingProduct]
        },
        decremetQuantity:(state,action)=>{
        const existingProduct=state.find(pro=>pro.id==action.payload.id)
            existingProduct.quantity-=1
            existingProduct.totalPrice=parseFloat(existingProduct.quantity*existingProduct.price).toFixed(2)
            const reminingProducts=state.filter(pro=>pro.id!=existingProduct.id)
            state=[...reminingProducts,existingProduct]
        },
        removeFromCart:(state,action)=>{
            return state=state.filter(pro=>pro.id!=action.payload.id)
        
  
          },
          deleteAllProducts:(state)=>{
              return state=[]
          }

    }
})

export default cartSlice.reducer
export const {addtoCart,incrementQuantity,decremetQuantity,removeFromCart,deleteAllProducts} =cartSlice.actions
