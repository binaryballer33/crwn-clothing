import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      {/* 
        A <Fragment /> is a component that gets rendered to nothing when it is mounted on the DOM
        Useful if you don't want to render unnecessary html elements, like a outter useless <div></div>
      */}
      <NavigationContainer>
        <LogoContainer to="/">
          {/* 
            Made this a ReactComponent with the import statment below 
            import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
          */}
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          {/* A <Link /> is basically a <a> but it works well with <BrowserRouter /> */}
          <NavLink to="/shop">SHOP</NavLink>

          {/* if the currentUser is not null, aka they have logged in
                then change the link element to a sign out span element
                with this ternary statement below
          */}
          {currentUser ? (
            // will render the component as a span and not a link, because you used the as keyword
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>

      {/* A Outlet helps control whether or not something will render */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
