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
                const user = userCredential.user;
                setTimeout(() => {
                    props.handleProfileClick()
                }, 1500)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)

            });
    }

    function processSignUpFormData(e){
        e.preventDefault()
        createUserWithEmailAndPassword(auth, signUpFormData.signUpEmail, signUpFormData.signUpPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
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
            // Sign-out successful.
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
            {/* separate component for sign in type? bit not DRY */}
                {signInMethod
                ?   <form onSubmit={processSignInFormData}>
                        <fieldset className='logInForm'>
                            <legend>Sign In</legend>
                            <label htmlFor="signInEmail" className="">Email:</label>
                            <input type="email" name="signInEmail" id="signInEmail" value={signInFormData.signInEmail} onChange={handleChange}/>
                            <label htmlFor="signInPassword" className="">Password:</label>
                            <input type="password" name="signInPassword" id="signInPassword" value={signInFormData.signInPassword} onChange={handleChange}/>
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
                <p>Hello {props.user}</p>
                <button onClick={handleSignOut}>Sign Out</button>
                {/* add links for lists: games played/games to play */}
            </div>
        }
    </div>
  )
}
