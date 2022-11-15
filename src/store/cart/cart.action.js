import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
  
    // if found, increment quantity
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? // returning a new object so that react recognizes it has a new obj and re-renders
            { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
  
    // return new array with modified cartItems / new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};
  
const remoteCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // check if the quantity === 1, if so, remove it from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

    // return back cartItems, with matching reduced quantity for that cartItem
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
        ? // returning a new object so that react recognizes it has a new obj and re-renders
            { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
};

const clearCartItem = (cartItems, cartItemToClear) => {
    // clear the item from the cart if it matches cartItemToClear
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems}
  };

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = remoteCartItem(cartItems, cartItemToRemove);
    return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems}
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems}
};

export const setCartItems = (cartItems) => ({
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: cartItems,
  });
  
  export const setIsCartOpen = (boolean) => ({
    type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
    payload: boolean,
  });
