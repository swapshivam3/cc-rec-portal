import React, { useState , useEffect } from "react";
import axios from "axios";
import "./Exam.css";
import ReactHtmlParser from "react-html-parser";

const doubleDigis = (num) => {
  if (num == 0 || num < 0) {
    return "00";
  }
  if(num===1) {
    return "01";
  }
  if (num === 2) {  
    return "02";
  }
  if (num === 3) {
    return "03";
  }
  if (num === 4) {
    return "04";
  }
  if (num === 5) {
    return "05";
  }
  if (num === 6) {
    return "06";
  }
  if (num === 7) {
    return "07";
  }
  if (num === 8) {
    return "08";
  }
  if (num === 9) {
    return "09";
  }
  return num;
}

const Exam = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [questions, setQuestions] = useState(null);

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const saved = localStorage.getItem("savedOptions");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [time,setTime] = useState(3600);
  const [fibanswer, setFibanswer] = useState("");
  const [submittedAnswers,setSubmittedAnswers] = useState(() => {
    const saved2 = localStorage.getItem("savedAnswer");
    const initialValue = JSON.parse(saved2);
    return initialValue || [];
  });
  
  const startTimer = () => {
    setInterval(() => {
      setTime(time => time - 1);
    }, 1000);
  }

  

  useEffect(() => {
    if (time < 0) {
      handleSubmitButton();
    }
   }, [time]);

   useEffect(() => {
      const config = {
        url: "https://api.cc-recruitments.tech/exam-api/GetTime",
        method: "get",
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    }

    axios(config)
    .then(function (response) {
      setTime(parseInt(response.data.time, 10));
      startTimer();
    })
    .catch(function (error) {
      console.log(error)
    });
   }, [])

  const handleAnswerOption = (answer,id) => {
    // setSelectedOptions([
    //   (selectedOptions[currentQuestion] = { answertext: answer, qid:id }),
    // ]);
    // setSelectedOptions([...selectedOptions]);
    // let temp = fibanswer;
    // temp.push({answertext: answer, qid:id});
    // setFibanswer(temp);
    setSubmittedAnswers([
      (submittedAnswers[currentQuestion] = { answertext: answer, qid:id }),
    ]);
    setSubmittedAnswers([...submittedAnswers]);
  };

  const handleMCQAnswerOption = (answer,id) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answer: answer, qid:id }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  const handlePrevious = () => {
    setFibanswer("");
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
    setFibanswer(submittedAnswers[prevQues].answertext ? submittedAnswers[prevQues].answertext : "");
  };

  const handleNext = () => {
    setFibanswer("");
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
    setFibanswer(submittedAnswers[nextQues].answertext ? submittedAnswers[nextQues].answertext : "");
  };

  const handleSubmitConfirmation = () => {
    if (window.confirm('Do you really want to submit? This action is IRREVERSIBLE.')) {
           handleSubmitButton();
       } else {
            // Do nothing!
       }
  }

  const handleSubmitButton = () => {
    let answers = [...selectedOptions, ...submittedAnswers];
    answers = answers.filter(function( element ) {
    return element !== undefined;
    });
    
    var config = {
        method: 'post',
        url: 'https://api.cc-recruitments.tech/exam-api/PostAnswers',
        headers: { 
          'content-type': 'application/json',
          'X-CSRFToken': props.person.csrf
        },
        data: answers,
        withCredentials: true
        };
        
      axios(config)
      .then(function (response) {
        setSubmitted(true);
        window.location.replace("https://cc-recruitments.tech/");
      }).catch(function (error) {
        window.alert("Something went wrong, please try again. If the problem persists, please join the meet - https://meet.google.com/mzi-yscc-ega.");
        console.log(error);
      });
    
  };

  const handleNavigation = (e) => {
    setFibanswer("");
    setCurrentQuestion(e);
  }

  useEffect(() => {
    setSelectedOptions2(selectedOptions)
    localStorage.setItem("savedOptions", JSON.stringify(selectedOptions));
  }, [selectedOptions])

  useEffect(() => {
    localStorage.setItem("savedAnswer", JSON.stringify(submittedAnswers));
  }, [submittedAnswers])

  useEffect(() => {

    const config = {
        url: "https://api.cc-recruitments.tech/exam-api/GetQuestions",
        method: "get",
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    }

    axios(config).then(res => {
      if (res.data && !Array.isArray(res.data)) {
        window.alert("Error in fetching questions, please try again (reload the page). If the issue persists please join the meet - https://meet.google.com/mzi-yscc-ega.");
      } else {
          const examQuestions = res.data.sort((a,b) => (a.sno > b.sno) ? 1 : ((b.sno > a.sno) ? -1 : 0))
          setQuestions(examQuestions);
      }
    }).catch(err => {
      console.log(err)
    }); 
    
  }, [])

  let toRender = <div className="text-center text-2xl mt-4 text-white">Loading Questions...</div>;

  if (questions !== null) {
    toRender = (
      <div className="z-10 flex px-2 md:px-5 justify-center items-center ExamComp text-white">
      
     {!submitted ?  (
        <div className="flex flex-col md:pl-8 md:pr-16" style={{flexShrink:"30", alignItems:"center" , width: "100%"}}>
            <div className="master-ques">
              <div className="pl-8 pr-8" style={{display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", width:"100%"}}>
                <div className="text-2xl">Time Left - </div>
                <div className="timer">{doubleDigis(Math.floor(time/60))} : {doubleDigis(time%60)} </div>
              </div>      
                          <div className="question-nav">
                            { questions.map((ques) => (  
                              <div className="question-nav-child">
                                { (selectedOptions2[ques.sno] == null && submittedAnswers[ques.sno] == null ) ? (<div className="opt1"><div onClick={() =>  handleNavigation(ques.sno)} className="cursor-pointer ques-num"> Q{ques.sno+1}</div></div>) : ( <div className="opt2"><div onClick={() =>  handleNavigation(ques.sno)} className="cursor-pointer ques-num"> Q{ques.sno+1}</div></div>) }
                            </div> ))}
                          </div>
                      <div className="text-base flex flex-row mt-4"> 
                        <div className="flex items-center m-4"><div className="opt11"></div> <p>Unanswered</p></div>
                        <div className="flex items-center m-4"><div className="opt12"></div> <p>Answered</p></div>  
                      </div>  
              </div>
            <div className="resources">
                  <p className="font-bold text-center text-xl mb-4">Resources</p>
                  <p>{ReactHtmlParser(questions[0].hint_text)}</p>
                  <br></br>
              <p><a href={questions[0].hint_link} target="_blank" className="text-blue-500">{questions[currentQuestion].hint_link==="" ? null : "Resource Link"}</a></p>
              </div>
        </div>      
                  ) : (<div></div>)}
      
      {submitted ? (
        <div> 
        <h1 className="text-2xl md:text-3xl p-4 font-bold text-center text-white mt-10">
          Thank you for your participation, we will get in touch with you soon. In case you didn't submit, your answers have been auto-submitted. 
        </h1>
        </div>
      ) : (
        

        <div className="w-3/4 ques-panel md:pr-8" >
          
          <div className="flex flex-col items-start w-full p-4 md:p-10">
            <h4 className="mt-10 text-xl text-white font-bold">
              Question {currentQuestion + 1} of {questions.length}
            </h4>
           <div className="mt-4 text-base md:text-xl text-white font-bold">
                  <div className="unselectable">{ReactHtmlParser(questions[currentQuestion].qtxt)}</div>
                  { questions[currentQuestion]["question_file.url"] !== 'null'  ? (
                    <div className="optionDiv flex justify-around items-center m-2 p-4">
                      <img src={questions[currentQuestion]["question_file.url"]} />
                    </div>
                  ) : null}
            </div>
          </div>

          <div className="flex flex-col w-full">
            {questions[currentQuestion].is_blank ? (
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Enter your answer here..."
                  className="px-3 py-3 placeholder-blueGray-300 card text-blueGray-600 relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full text-white"
                  value={ submittedAnswers[currentQuestion] != null ? (submittedAnswers[currentQuestion].answertext) : (fibanswer)}
                  onChange={(e) => {
                    setFibanswer(e.target.value);
                    handleAnswerOption(e.target.value,questions[currentQuestion].id)
                  }}
                />
              </div>
            ) : (
              questions[currentQuestion].options.map((answer, index) => (
                <div
                  key={index}
                  onClick={() => {document.getElementById("checkbox"+index).checked = true; handleMCQAnswerOption(index,questions[currentQuestion].id)}}
                  className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl"
                >
                  <input
                    type="radio"
                    id={"checkbox"+index}
                    name={answer.text}
                    value={answer.text}
                    onChange={(e) => handleMCQAnswerOption(index,questions[currentQuestion].id)}
                    checked={
                      selectedOptions[currentQuestion]
                        ? index ===
                          selectedOptions[currentQuestion].answer
                        : false
                    }
                    className="w-6 h-6 card bg-black"
                  />
                  <p className="ml-6 text-white">{answer.text}</p>
                  {answer.file !== "null" ? (
                    <div className="optionDiv flex justify-around items-center m-2 p-4">
                      <img src={answer.file} alt="optionImage" />
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between w-full mt-4 text-white mb-4">
            <button
              onClick={handlePrevious}
              className="w-1/2 m-1 py-3 text-xl button bg-black rounded-lg"
            >
              Previous
            </button>
            <button
                  onClick={
                    currentQuestion + 1 === questions.length
                      ? handleSubmitConfirmation
                      : handleNext
                  }
                  className={currentQuestion + 1 === questions.length ? "w-1/2 m-1 ml-10 text-xl py-3 button greenborder rounded-lg" : "w-1/2 m-1 ml-10 text-xl py-3 button bg-black rounded-lg"}
            >
              {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>

    );
  }

  

  return toRender;
};

export default Exam;