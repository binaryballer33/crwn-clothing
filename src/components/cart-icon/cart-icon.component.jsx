import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import {
  selectIsCartOpen,
  selectCartCount,
} from "../../store/cart/cart.selector";

import { setIsCartOpen } from "../../store/cart/cart.action";

import {
  ItemCount,
  CartIconContainer,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
