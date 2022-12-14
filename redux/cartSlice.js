import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartQty: 0,
    total: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.cartQty += +action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state.products = [];
      state.cartQty = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
