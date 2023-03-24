import React, {useState} from 'react'
import ProfileModal from './ProfileModal'

export default function Header(props) {
  const [profileClicked, setProfileClicked] = useState(false)
  
  function handleProfileClick(){
    setProfileClicked(prev => !prev)
  }
  
  return (
    <div>
        <div className='headerContainer'>
            <h1 className='headerTitle'>gameState</h1>
            <img src="./user.png" alt="profile icon" className='profileIcon empty' onClick={handleProfileClick}/>
        </div>
        {profileClicked && 
            <ProfileModal
                handleProfileClick={handleProfileClick}
                loggedIn={props.loggedIn}
            />}
    </div>
  )
}
