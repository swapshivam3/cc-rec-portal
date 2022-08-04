import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = (props) => {

  const logoutMessage = () => toast('Logged out', {
position: "bottom-right",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
  });
  

  const logout = () => {

    if (props.loggedIn && props.person!==null) {
      var config = {
        method: 'get',
        url: 'https://api.cc-recruitments.tech/user-api/LogoutView',
        withCredentials: true
      };

      axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    logoutMessage();
    props.toggleLoggedIn(false);
    props.toggleWantsIn(false);
    //code to logout
  }
  return (
    <nav
      className='flex justify-between items-center h-16 topbarr text-white relative shadow-sm'
      role='navigation'
    >
      <NavLink to='/' className='flex pl-8 items-center'>
        <img style={{filter:"drop-shadow(0px 0px 15px rgba(255, 0, 0, 1))"} } width="50" height="50" src="/assets/logo.svg" className="" alt="logo" />
        <p className="mt-2 ml-3 headline" style={{ filter: "drop-shadow(5px 5px 10px rgba(255, 0, 0, 1))", lineHeight:"60%"} }>CODING CLUB<br></br><span className='text-sm md:text-xl'>RECRUITMENTS</span></p>
      </NavLink>
      <div className='px-4 cursor-pointer md:hidden' onClick={props.toggle}>
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </div>
      <div className='pr-8 md:block  hidden alignment'>
        <NavLink exact={true} to='/' activeClassName='activeStyle' activeClassName="activeStyle" className='p-4'>
        Home
      </NavLink>
      {/* <NavLink to='/projects' activeClassName="activeStyle" className='p-4'>
        Our Projects
      </NavLink> */}
        <NavLink to='/test' activeClassName="activeStyle" className='p-4'>
        Recruitment Test
      </NavLink>
      {!props.loggedIn ? <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile+https%3A//www.googleapis.com/auth/userinfo.email&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https%3A//api.cc-recruitments.tech/rest-auth/google/callback/&client_id=754009890523-f8r6n04j7k09grmf1auf8c872a7j1nbm.apps.googleusercontent.com&hd=pilani.bits-pilani.ac.in" activeClassName="activeStyle" className='p-4'>
        <span id="changeText">Login</span>
      </a> : <div><NavLink to='/preferences' activeClassName="activeStyle" className='p-4'>
        Profile
      </NavLink> <NavLink to='/' onClick={logout} className='p-4'> Logout </NavLink></div>}
      
      </div>
      
    </nav>
  );
};

export default Navbar;
