import React from 'react'
import AuthDetails from '../auth/AuthDetails'

const Navbar = () => {
  // const {currentUser} = useContext(AuthDetails);
  // console.log(currentUser);

  return (
    <div className='navbar'>Chat App
        <AuthDetails />
    </div>
  )
}

export default Navbar