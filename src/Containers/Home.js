import React from 'react';
import Carousel from "../Components/Carousel/Carousel";
import CubeCarousel from "../Components/CubeCarousel/CubeCarousel";
import Landing from "../Components/Landing/Landing";
import axios from 'axios';
import {useEffect} from 'react';

const Home = (props) => {


    return (
        <div>
            <Landing loggedIn={props.loggedIn} />
            {/*<Carousel />*/}
        </div>
    )
}

export default Home;
