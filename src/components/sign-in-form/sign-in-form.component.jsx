import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthWithUserEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    // set the state equal to the defaultFormField values
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthWithUserEmailAndPassword(email, password);
            console.log(response);
            // after signing in the user successfully, reset the form fields
            resetFormFields();
        } catch (error) {
            switch(error.code) {
                case 'auth/popup-closed-by-user':
                    alert('Login cancelled by user');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email')
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect password for email')
                    break;
                default:
                    alert(error);
                    break;
            }
        }
    }

    const handleChange = (event) => {
        const { name , value } = event.target;

        /* using the spread operator keep all the other values of the state the same, 
        *  only update the state of the inbox that has been changed 
        */
        setFormFields({...formFields, [name]: value });
    }

    const signInWithGoogle = async () => {
        // destructurec user from response.user
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    };

    return (
        <div className="sign-up-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email" 
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                />
                <FormInput 
                    label="Password" 
                    type='password'
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                />
                
                <div className="buttons-container">
                    {/* When this button is clicked w/ the type ='submit' it calls the callback function in onSubmit */}
                    <Button type='submit'>SIGN IN</Button>
                    
                    {/*
                        Buttons are of type='submit' by default when they are inside of forms 
                        Put type button, so that the button does not fire when its clicked 
                    */}
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;