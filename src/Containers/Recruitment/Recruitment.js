import React, { useState, useEffect } from "react";
import Exam from "../../Components/Exam/Exam";
import Fade from 'react-reveal/Fade';
import './Recruitment.css';
import axios from 'axios';

const Recruitment = (props) => {

  const [score, setScore] = useState(-1);
 
  useEffect(() => {
      const config = {
        url: "https://api.cc-recruitments.tech/rec-api/GetCandidateScore",
        method: "get",
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    }

    axios(config)
    .then(function (response) {
      if (response.data) {
        setScore(response.data.score);
      }
    })
    .catch(function (error) {
      console.log(error)
    });
   }, [])

      
  return (
    <div>
    <div className="recruitmentDiv rounded-lg">
        
      <div className="flex flex-col items-center">
      <Fade top>
    
          <h3 className="text-white text-center p-2 mt-16 text-xl md:text-2xl font-bold">{score == -1 ? "You did not appear for the test." : `You scored ${score}/58.`}</h3>
          <div className="mt-2 p-4 md:p-8 text-center font-bold text-white"><div className="text-xl md:text-2xl mt-4">Please check your BITS Email Inbox and the spam folder from time to time.</div><div className="mx-auto w-3/4 md:w-1/2 mt-4"><img class="mx-auto" src="/assets/img.png" alt="club_image" /></div></div>;
    
      </Fade>
      
    </div>
        
    </div>
    </div>
  );
};

export default Recruitment;
