import React from "react";
import Navbar from "../Navbar/Navbar";
import './Login.css';
import Fade from 'react-reveal/Fade';
import axios from 'axios';
import {useEffect} from 'react';

function Login() {

    

    return(
        <div>
        <Fade>
        <div className="w-full flex items-center rounded-lg justify-center login mt-8 mb-10 p-4">
        <form className="w-full md:w-1/3 bg-white rounded-lg login-form">
            <div className="flex font-bold justify-center mt-2">
                <img className="h-20 w-20 login-image" />
            </div>
            <h2 className="text-xl text-center text-white mt-8">You must be logged in to set/update your preferences.</h2>
            <div className="px-12 pb-10 ">
                {/*<div className="w-full mb-2">
                    <div className="flex items-center">
                        <i className='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user'></i>
                        <input type='text' placeholder="Username"
                             className="-mx-6 px-8 bg-transparent w-full border-b-2 border-red-500 border-teal-600 bg-teal-400 p-8 rounded px-3 py-2 border-black focus:outline-none" />
                    </div>
                </div>
                <div className="w-full mb-2">
                    <div className="flex items-center">
                        <i className='ml-3 fill-current text-gray-400 text-xs z-10  fas fa-lock'></i>
                        <input type='text' placeholder="Password"
                             className="-mx-6 px-8  bg-transparent w-full border-b-2 border-red-500 border-teal-600 bg-teal-400 p-8 rounded px-3 py-2 border-black focus:outline-none" />
                    </div>
                </div>
                        
                <a href="#" className="text-xs text-white float-right mb-4">Forgot Password?</a>
                <button type="submit"
                                className="login-button mt-4 w-full py-2 rounded-full bg-red-500 text-gray-100  focus:outline-none">Login
                </button>*/}
  
            </div>
        </form>
    </div>
    </Fade>
    </div>
    )
}

export default Login;