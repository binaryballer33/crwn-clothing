import { createSelector } from "reselect";

export const selectCartReducer = (state) => state.cart;

// memoized getting the state from the cart with these selectors below

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.IsCartOpen
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