import { createSelector } from "reselect";

// this is referencing the key for state.cart in the rootReducer
export const selectCartReducer = (state) => state.cart;

// memoized getting the state from the cart with these selectors below

// this is referencing state.cart from rootReducer but them going into
// state.cart.isCartOpen that we created in the INITIAL_STATE in the reducer
export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

// generate newCartCount
export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (accumulator, cartItem) => accumulator + cartItem.quantity,
        0
    )
)

// generate newCartTotal
export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (accumulator, cartItem) =>
          accumulator + cartItem.quantity * cartItem.price,
        0
      )
)