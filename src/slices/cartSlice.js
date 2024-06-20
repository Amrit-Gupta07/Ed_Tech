import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state,action){
        const course = action.payload

        const index = state.cart.findIndex( (item) => item._id === course._id);

        if(index >= 0){
            toast.error("Course already added")
            return
        }

        state.cart.push(course);
        state.total += course.price;
        state.totalItems ++;

        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.cart));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

    },
    removeFromCart(state,action){
        const courseId = action.payload;

        const index = state.cart.findIndex((item) => item._id === courseId);

        if(index >= 0){
            state.totalItems--;
            state.total -= state.cart[index].price;

            state.cart.splice(index,1)

            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
            localStorage.setItem("total",JSON.stringify(total))

            toast.success("Item Removed from cart")
        }
    },
    resetCart(state,action){
        state.cart = []
        state.total = 0;
        state.totalItems = 0;
        localStorage.removeItem("cart")
        localStorage.removeItem("totalItems")
        localStorage.removeItem("cart")
    }
  },
});

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;

export default cartSlice.reducer;
