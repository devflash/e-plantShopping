import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload
      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        return {
          ...state,
          items: state.items.map((item)=> {
            if(item.name === name){
              return {
                ...item,
                quantity: item.quantity++
              }
            }
            return item
          })  
        }
      }else{
        return {
          ...state,
          items: [...state.items, {name, image, cost, quantity: 1}]
        }
      }
      
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      const items = state.items.filter((item) => item.name !== name);
      return {
        ...state,
        items
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
      // Find the item in the cart that matches the given name
      return {
        ...state,
        items: state.items.map((item)=>{
          if(item.name === name){
            return {
              ...item,
              quantity: quantity
            }
          }
          return item
        })
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
