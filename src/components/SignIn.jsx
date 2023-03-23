import React, { useState } from 'react'
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "../firebaseConfig";

export default function SignIn() {
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
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // ..
        });
    }

    function handleSignOut(){
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

  return (
    <div>

        <form onSubmit={processSignInFormData}>
            <fieldset>
                <legend>Sign In</legend>
                <label htmlFor="signInEmail" className="">Email:</label>
                <input type="email" name="signInEmail" id="signInEmail" value={signInFormData.signInEmail} onChange={handleChange}/>
                <label htmlFor="signInPassword" className="">Password:</label>
                <input type="password" name="signInPassword" id="signInPassword" value={signInFormData.signInPassword} onChange={handleChange}/>
                <button>Sign In</button>
            </fieldset>
        </form>
        <form onSubmit={processSignUpFormData}>
            <fieldset>
                <legend>Sign Up</legend>
                <label htmlFor="signUpEmail" className="">Email:</label>
                <input type="email" name="signUpEmail" id="signUpEmail" value={signUpFormData.signUpEmail} onChange={handleChange}/>
                <label htmlFor="signUpPassword" className="">Password:</label>
                <input type="password" name="signUpPassword" id="signUpPassword" value={signUpFormData.signUpPassword} onChange={handleChange}/>
                <button>Sign up</button>
            </fieldset>
        </form>
        <button onClick={handleSignOut}>Sign Out</button>

    </div>
  )
}
