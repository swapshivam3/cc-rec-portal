import React from 'react';
import { NavLink } from 'react-router-dom';
import './Dropdown.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dropdown = (props) => {
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
    <div
      className={
        props.isOpen
          ? 'grid grid-rows-4 text-center items-center bgdropdown text-white drop'
          : 'hidden text-white drop'
      }
      onClick={props.toggle}
    >
      <NavLink to='/' exact={true} activeClassName='activeStyled' className='p-4'>
        Home
      </NavLink>
      {/* <NavLink to='/projects' activeClassName='activeStyled' className='p-4'>
        Our Projects
      </NavLink> */}
      <NavLink to='/test' activeClassName='activeStyled' className='p-4'>
        Recruitment Test
      </NavLink>
      {/* <NavLink to='/preferences' activeClassName='activeStyled' className='p-4'>
        Preferences
      </NavLink> */}
      { !props.loggedIn ? <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile+https%3A//www.googleapis.com/auth/userinfo.email&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https%3A//api.cc-recruitments.tech/rest-auth/google/callback/&client_id=754009890523-f8r6n04j7k09grmf1auf8c872a7j1nbm.apps.googleusercontent.com&hd=pilani.bits-pilani.ac.in" activeClassName='activeStyled' className='p-4'>
        <span id="changeTextMob">Login</span>
      </a> : <div className="mob-dd"> <NavLink to='/preferences' activeClassName='activeStyled' className='p-4'>
        Profile
      </NavLink>
        <NavLink to='/' onClick={logout} className='p-4'> Logout </NavLink> </div>}
      
    </div>
  );
};

export default Dropdown;
