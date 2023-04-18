import React, { useState } from 'react'
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "../firebaseConfig";

export default function ProfileModal(props) {
    const [signInMethod, setSignInMethod] = useState(true)
    
    const [signInFormData, setSignInFormData] = useState({
        signInEmail: '', signInPassword: ''
    })
    const [signUpFormData, setSignUpFormData] = useState({
        signUpEmail: '', signUpPassword: ''
    })

    const [errorMessage, setErrorMessage] = useState('')

    const userName = props.user.charAt(0).toUpperCase() + props.user.slice(1)

    function handleChange(e){
        const {name, value, id} = e.target
        const selectForm = id.slice(0,6)
        if(selectForm == "signIn"){
            setSignInFormData(prevFormData => ({...prevFormData, [name]: value}))
        } else {
            setSignUpFormData(prevFormData => ({...prevFormData, [name]: value}))
        }
    }

    function processSignInFormData(e){
        e.preventDefault()
        signInWithEmailAndPassword(auth, signInFormData.signInEmail, signInFormData.signInPassword)
            .then((userCredential) => {
                // Signed in 
                setTimeout(() => {
                    props.handleProfileClick()
                }, 1500)
            })
            .catch((error) => {
                setErrorMessage('Incorrect email or password');
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)

            });
    }

    function processSignUpFormData(e){
        e.preventDefault()
        setErrorMessage('')
        createUserWithEmailAndPassword(auth, signUpFormData.signUpEmail, signUpFormData.signUpPassword)
        .then((userCredential) => {
            setTimeout(() => {
                props.handleProfileClick()
            }, 1500)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // ..
        });
    }

    function switchSignInMethod(){
        setSignInMethod(prev => !prev)
    }

    function handleSignOut(){
        signOut(auth).then(() => {
            setTimeout(() => {
                props.handleProfileClick()
            }, 1000)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

  return (
    <div className="profileModalContainer">
        {!props.loggedIn ?
            <div className='logInContainer'>
                {signInMethod
                ?   <form onSubmit={processSignInFormData}>
                        <fieldset className='logInForm'>
                            <legend>Sign In</legend>
                            <label htmlFor="signInEmail" className="">Email:</label>
                            <input type="email" name="signInEmail" id="signInEmail" value={signInFormData.signInEmail} onChange={handleChange}/>
                            <label htmlFor="signInPassword" className="">Password:</label>
                            <input type="password" name="signInPassword" id="signInPassword" value={signInFormData.signInPassword} onChange={handleChange}/>
                            <p className='errorMessage'>{errorMessage ? errorMessage : '\u00A0'}</p>
                            <button className='logInBtn btn'>Sign In</button>
                        </fieldset>
                    </form>
                :   <form onSubmit={processSignUpFormData}>
                        <fieldset className='logInForm'>
                            <legend>Sign Up</legend>
                            <label htmlFor="signUpEmail" className="">Email:</label>
                            <input type="email" name="signUpEmail" id="signUpEmail" value={signUpFormData.signUpEmail} onChange={handleChange}/>
                            <label htmlFor="signUpPassword" className="">Password:</label>
                            <input type="password" name="signUpPassword" id="signUpPassword" value={signUpFormData.signUpPassword} onChange={handleChange}/>
                            <button className='logInBtn btn'>Sign up</button>
                        </fieldset>
                    </form>
                }
            
                {signInMethod ? <p className='logInMethodTxt' onClick={switchSignInMethod}>New user? Sign up here</p> : <p className='logInMethodTxt' onClick={switchSignInMethod}>Already a user? Sign in here</p>}
        
            </div>

        :   <div className="profileInfo">
                <p>Hello {userName}</p>
                <button className='btn' onClick={handleSignOut}>Sign Out</button>
            </div>
        }
    </div>
  )
}
