import { signInWithGooglePopup } from '../../../utils/firebase/firebase.utils';
import './sign-in.styles.scss';

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
    );
};

export default SignIn;

