import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.styles.scss'; 

const Navigation = () => {
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
                </div>

            </div>
            
            {/* A Outlet helps control whether or not something will render */}
            <Outlet />
        </Fragment>
    )
}

export default Navigation;