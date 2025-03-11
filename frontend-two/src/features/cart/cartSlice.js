import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalCost: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const productAlreadyInCart = state.cartItems.find(
        (item) => item.product_id === action.payload.product_id
      );
      if (productAlreadyInCart !== undefined) {
        return;
      }
      state.cartItems = [action.payload, ...state.cartItems];
      // calculate the total cost of all the items in the cartitems array
      let temTotal = 0;
      state.cartItems.forEach((item) => {
        temTotal += item.product_quantity * item.product_price;
      });
      state.totalCost = temTotal;
      //calcilation ends here

      //console.log("User has added item", state.cartItems);
    },

    increaseProductQty: (state, action) => {
      const updateProducts = state.cartItems.map((item) => {
        if (item.product_id === action.payload) {
          item.product_quantity += 1;
        }
        return item;
      });
      state.cartItems = updateProducts;
      // calculate the total cost of all the items in the cartitems array
      let temTotal = 0;
      state.cartItems.forEach((item) => {
        temTotal += item.product_quantity * item.product_price;
      });
      state.totalCost = temTotal;
      //calcilation ends here
    },

    decreaseProductQty: (state, action) => {
      const updateProducts = state.cartItems.map((item) => {
        if (item.product_id === action.payload && item.product_quantity > 1) {
          item.product_quantity -= 1;
        }
        return item;
      });
      state.cartItems = updateProducts;
      // calculate the total cost of all the items in the cartitems array
      let temTotal = 0;
      state.cartItems.forEach((item) => {
        temTotal += item.product_quantity * item.product_price;
      });
      state.totalCost = temTotal;
      //calcilation ends here
    },

    deleteCartItem: (state, action) => {
      const updateProducts = state.cartItems.filter(
        (item) => item.product_id !== action.payload
      );
      state.cartItems = updateProducts;
      // calculate the total cost of all the items in the cartitems array
      let temTotal = 0;
      state.cartItems.forEach((item) => {
        temTotal += item.product_quantity * item.product_price;
      });
      state.totalCost = temTotal;
      //calcilation ends here
    },
  },
});

export const {
  addItemToCart,
  increaseProductQty,
  decreaseProductQty,
  deleteCartItem,
} = cartSlice.actions;
export default cartSlice.reducer;
