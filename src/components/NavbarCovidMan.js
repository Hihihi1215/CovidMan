import React, { useEffect } from 'react'
import { Button, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import '../css/Navbar.css'
import { firebaseSignOut } from '../firebase';
import { useUserAuth, useUserType } from '../UserAuthContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function NavbarCovidMan() {

    const user = useUserAuth();
    const userType = useUserType();
    const navigate = useNavigate();

    const navigateOrgRepHomeOrHome = () => {
        if(!user){
            navigate('/')
        }
        else {
            if(userType === "orgRep"){
                navigate('/OrgRepHome')
            }
        }
    }

    const signOut = () => {
        firebaseSignOut();
        navigate('/', { replace : true});
    }

    useEffect(() => {
        const navbarCovidMan = document.querySelector('.navbar-covidman');

        const showAnim = gsap.from('.navbar-covidman', { 
            yPercent: -100,
            duration: 0.3
        }).progress(1);
        
        ScrollTrigger.create({
            start: "top top",
            end: 99999,
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse()
        }
        });
        window.addEventListener('scroll', e => {
            const scroll = window.scrollY;
            if(scroll > 0 ) {
                console.log('hi')
                navbarCovidMan.classList.add('navbar-covidman--black');
            } else {
                navbarCovidMan.classList.remove('navbar-covidman--black');
            }
        })
    }, [])

  return (
    <Navbar collapseOnSelect expand={false} className='navbar-covidman'>
        <div className='navbar-covidman__wrapper'>
            <img 
                src="https://fontmeme.com/permalink/220308/2742ac409365c06b7e11398c0224e18d.png" alt="spider-man-homecoming-font" border="0"
                className='website-logo'
                onClick={navigateOrgRepHomeOrHome}/>
            {
                !user?
                    (
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
                    ) :
                    (
                        <>
                            <Button onClick={signOut} className='navbar-links signout-link'>Sign Out</Button>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        </>
                    )
            }
            <Navbar.Offcanvas placement="end" className="navbar-offcanvas">
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        userType === "orgRep"?
                            (
                                <>
                                    <Link to='/OrgRepHome/RegisterApp' className='navbar-links orgRep-navbar-links'>Regiser Aid Applicant</Link>
                                    <Link to='/OrgRepHome/ViewOrgAppeals' className='navbar-links orgRep-navbar-links'>View Org Appeals</Link>
                                    <Link to='/OrgRepHome/OrganizeAidAppeal' className='navbar-links orgRep-navbar-links'>Organize Aid Appeal</Link>
                                    <Link to='/OrgRepHome/RecordContribution' className='navbar-links orgRep-navbar-links'>Record Contribution</Link>
                                </>
                            ) :
                            <div></div>
                    }
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </div>
    </Navbar>
  )
}

export default NavbarCovidMan