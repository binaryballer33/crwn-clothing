import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { UserContext } from '../contexts/user.context';
import { CartContext } from '../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss'; 

const Navigation = () => {
    /*useContext makes the componennt re-render when a value inside of its context updates
    * By getting values from useContext, you have HOOKED your component into context
    */
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            {/* 
                A <Fragment /> is a component that gets rendered to nothing when it is mounted on the DOM
                Useful if you don't want to render unnecessary html elements, like a outter useless <div></div>
            */}
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    {/* 
                        Made this a ReactComponent with the import statment below 
                        import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
                    */}
                    <CrwnLogo className='logo' />
                </Link>

                <div className='nav-links-container'>
                    {/* A <Link /> is basically a <a> but it works well with <BrowserRouter /> */}
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>

                    {/* if the currentUser is not null, aka they have logged in
                        then change the link element to a sign out span element
                        with this ternary statement below
                    */}
                    { currentUser ? (
                        <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )}
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            
            {/* A Outlet helps control whether or not something will render */}
            <Outlet />
        </Fragment>
    )
}

export default Navigation;