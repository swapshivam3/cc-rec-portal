import React, { useState } from "react";
import Exam from "../../Components/Exam/Exam";
import Fade from 'react-reveal/Fade';
import './Recruitment.css';

const Recruitment = (props) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };
  
  let buttonClass = "p-10 mt-10 py-2 rounded-full bg-red-500 text-gray-100 focus:outline-none hover:bg-red-600";
  if (!props.loggedIn) {
    buttonClass += " cursor-not-allowed opacity-50 disabledButton";
}
    

    let toRender = <div>
        <div className="recruitmentDiv rounded-lg">
            {show ? <Exam person={props.person} /> : (
                <div className="flex flex-col items-center">
                    <Fade top>
                        <div className=" flex justify-center items-center">
                            <div className=" h-64 w-56 mt-24 flex flex-col justify-around items-center recruitment-card">
                                <div className="bg-red-600 h-24 w-24 rounded-full flex items-center justify-center recruitment-card-image" >
            
                                </div>
                                <h3 className="text-white text-center p-2">{props.loggedIn && props.person !== null ? <React.Fragment>Welcome {props.person.name}</React.Fragment> : <>Please login to start the test</>}</h3>
                            </div>
                        </div>
      
                        <button className={buttonClass} onClick={toggleShow} disabled={!props.loggedIn}>
                            {(props.person && props.person.time < 3600) ? "Resume Test" : "Start Test"}
                        </button>
              
               
                    </Fade>
      
                </div>)
            }
        </div>
    </div>;

    if (props.person && props.person.testSubmitted) {
        toRender = <div className="mt-8 p-4 md:p-8 text-center font-bold text-white"><div className="text-xl md:text-2xl mt-4">You have already submitted the test. Please visit after 10:30 PM to check your score. Please check your BITS Email Inbox and the spam folder from time to time.</div><div className="mx-auto w-3/4 md:w-1/2 mt-4"><img class="mx-auto" src="/assets/img.png" alt="club_image"/></div></div>;
    }
    
    return (
  <React.Fragment>
            {toRender}
        </React.Fragment>
  );
};

export default Recruitment;
