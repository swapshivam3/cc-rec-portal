import React, { useEffect, useState } from "react";
import "./Landing.scss";
import { NavLink } from "react-router-dom";
import Fade from 'react-reveal/Fade';

const Landing = (props) => {
  const [render, setRender] = useState(false);
  const [border, setBorder] = useState(4);

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
      setBorder(0);
    }, 200);
  });

  const styles = {
    border: `${border} solid white`,
    fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif'
  };

  // return (
  //   <div>
  //     <div className="z-10">
        
        <div className="w-screen flex justify-center">
          <h1 className="typing relative top-60  text-2xl md:text-3xl lg:text-4xl">
            {render ? <div className="type-text">BITS PILANI</div> : null}
          </h1>
        </div>
    //  </div>
  //   </div>
  // );

  let toRender = <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile+https%3A//www.googleapis.com/auth/userinfo.email&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https%3A//api.cc-recruitments.tech/rest-auth/google/callback/&client_id=754009890523-f8r6n04j7k09grmf1auf8c872a7j1nbm.apps.googleusercontent.com&hd=pilani.bits-pilani.ac.in" activeClassName="activeStyle" className='p-4'>
                SCORES RELEASED
  </a>
  
  if (props.loggedIn) {
    toRender = null
  }

  return (
    <div className="page">
    <div class="page-bg"></div>

    <div class="animation-wrapper">
      <div class="particle particle-1"></div> 
      <div class="particle particle-2"></div>
      <div class="particle particle-3"></div>
      <div class="particle particle-4"></div>
    </div>

    <div className="page-wrapper"> 
      <div className="w-screen flex justify-center">
          <h1 className="typing relative top-52 font-bold text-5xl md:text-6xl lg:text-7xl">
            <div style={styles} className="type-text">
              CODING CLUB
            </div>
          </h1>
        </div>
        <div className="w-screen flex justify-center">
          <h1 className="typing relative top-60  text-2xl md:text-3xl lg:text-4xl">
            {render ? <div className="type-text">BITS PILANI</div> : null}
          </h1>
        </div>
        <Fade>
        <div className="w-screen flex justify-center mt-8 applyButton">
          <h1 className="relative top-60 text-3xl md:text-4xl">
             {toRender}
          </h1>
          </div>
          </Fade>
    </div>
    </div>
  )
};

export default Landing;
