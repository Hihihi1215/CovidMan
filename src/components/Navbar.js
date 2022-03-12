import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import '../css/Navbar.css'
import { useUserAuth } from '../UserAuthContext';

function Navbar() {

    const user = useUserAuth();
    const navigate = useNavigate();

    const navigateOrgRepHomeOrHome = () => {
        if(!user){
            return <Navigate to='/'/>
        }
        else {
            navigate('/OrgRepHome')
        }
    }

  return (
    <nav className='nav-bar'>
        <img 
            src="https://fontmeme.com/permalink/220308/2742ac409365c06b7e11398c0224e18d.png" alt="spider-man-homecoming-font" border="0"
            className='website-logo'
            onClick={navigateOrgRepHomeOrHome}/>
        <ul className='navbar-liWrapper'>
            <li className='navbar-li'>
                <Link to='/SignIn' className='navbar-links first-navbarLink'>Sign In</Link>
            </li>
            <li className='navbar-li'>
                <Link to='/SignUp' className='navbar-links'>Sign Up</Link>
            </li>
            <li className='navbar-li'>
                <Link to='/ViewAppeals' className='navbar-links'>View Appeals</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar