import React, { Component } from "react";
import axios from "axios";
import Fade from 'react-reveal/Fade';
import { ReOrderableItem, ReOrderableList } from 'react-reorderable-list'
import 'react-reorderable-list/dist/index.css'
import './RegForm.css';
import Login from '../Login/Login';


export default class RegForm extends Component { 

  constructor(props) {
    const preferences = JSON.parse(localStorage.getItem("preferences"));
    const person = JSON.parse(localStorage.getItem("person"));

    super(props);

    let newPrList = null;

    if (preferences !== null) {

      newPrList = [
        { name: this.depFullName(preferences.pr1), id: this.depid(preferences.pr1) },
        { name: this.depFullName(preferences.pr2), id: this.depid(preferences.pr2) },
        { name: this.depFullName(preferences.pr3), id: this.depid(preferences.pr3) },
        { name: this.depFullName(preferences.pr4), id: this.depid(preferences.pr4) },
        { name: this.depFullName(preferences.pr5), id: this.depid(preferences.pr5) },
        { name: this.depFullName(preferences.pr6), id: this.depid(preferences.pr6) },
        { name: this.depFullName(preferences.pr7), id: this.depid(preferences.pr7) },
        { name: this.depFullName(preferences.pr8), id: this.depid(preferences.pr8) }
      ];
    }
    

        this.state = {
            customer: {
              name: person ? person.name : "",
              pr1: preferences ? preferences.pr1 : "ap",
              pr2: preferences ? preferences.pr2 : "fe",
              pr3: preferences ? preferences.pr3 : "be",
              pr4: preferences ? preferences.pr4 : "cp",
              pr5: preferences ? preferences.pr5 : "ui",
              pr6: preferences ? preferences.pr6 : "gd",
              pr7: preferences ? preferences.pr7 : "vi",
              pr8: preferences ? preferences.pr8 : "gr",
              github: preferences ? preferences.github : "",
              bits_email:person ? person.email : "",
              bits_id: person ? person.email.substring(5,9) : "",
              gender: "M",
              branch: preferences ? preferences.branch : "A1",
              status: preferences ? preferences.status : "PS",
              phone_number:  preferences ? preferences.phone_number : "",
          },
          prlist: preferences ? newPrList :
            [
              { id: 1, name: 'App Development' },
              { id: 2, name: 'Frontend Development' },
              { id: 3, name: 'Backend Development' },
              { id: 4, name: 'Competitive Coding' },
              { id: 5, name: 'UI/UX Design' },
              { id: 6, name: 'Game Development' },
              { id: 7, name: 'Video Editing' },
              { id: 8, name: 'Graphics Design' },
            ],          
          }
  }
  
  
      
        handleNameChanged(event) {
          var customer = this.state.customer;
          customer.name = event.target.value;
          this.setState({ customer: customer });
        }
        
        handleBitsEmailChanged(event) {
            var customer    = this.state.customer;
            customer.bits_email = event.target.value;
        
            this.setState({ customer: customer });
          }
          handlePhoneChanged(event) {
            var customer    = this.state.customer;
            customer.phone_number = event.target.value;
        
            this.setState({ customer: customer });
          }
          handleBitsIdChanged(event) {
            var customer    = this.state.customer;
            customer.bits_id = event.target.value;
        
            this.setState({ customer: customer });
          }
          handleGenderChanged(event) {
            var customer    = this.state.customer;
            customer.gender = event.target.value;
        
            this.setState({ customer: customer });
          }
          handleStatusChanged(event) {
                    var customer    = this.state.customer;
                    customer.status = event.target.value;
                
                    this.setState({ customer: customer });
          }
          handleBranchChanged(event) {
              var customer    = this.state.customer;
              customer.branch = event.target.value;
          
              this.setState({ customer: customer });
            }
          handleGithubChanged(event) {
            var customer    = this.state.customer;
            customer.github = event.target.value;
        
            this.setState({ customer: customer });
          }
          
  
        depName(id) {
          if (id === 1) return "ap";
          else if (id === 2) return "fe";
          else if (id === 3) return "be";
          else if (id === 4) return "cp";
          else if (id === 5) return "ui";
          else if (id === 6) return "gd";
          else if (id === 7) return "vi";
          else if(id===8) return "gr";
  }
  
  depid(name) {
    if (name === "ap") return 1;
    else if (name === "fe") return 2;
    else if (name === "be") return 3;
    else if (name === "cp") return 4;
    else if (name === "ui") return 5;
    else if (name === "gd") return 6;
    else if (name === "vi") return 7;
    else if (name === "gr") return 8;
  }
  
  depFullName(shortName) {
    if (shortName === "ap") return "App Development";
    else if (shortName === "fe") return "Frontend Development";
    else if (shortName === "be") return "Backend Development";
    else if (shortName === "cp") return "Competitive Coding";
    else if (shortName === "ui") return "UI/UX Design";
    else if (shortName === "gd") return "Game Development";
    else if (shortName === "vi") return "Video Editing";
    else if (shortName === "gr") return "Graphic Design";
  }
          
  handleButtonClicked(e) {
    e.preventDefault();

    if (this.state.customer.bits_id.length !== 4) {
      window.alert("Please enter the last four digits from your BITS ID");
    } else {

      if (this.props.person !== null) {
        const toSubmit = {
          github: this.state.customer.github,
          bits_id: `2021${this.state.customer.branch}${this.state.customer.status}${this.state.customer.bits_id}P`,
          gender: "M",
          pr1: this.state.customer.pr1,
          pr2: this.state.customer.pr2,
          pr3: this.state.customer.pr3,
          pr4: this.state.customer.pr4,
          pr5: this.state.customer.pr5,
          pr6: this.state.customer.pr6,
          pr7: this.state.customer.pr7,
          pr8: this.state.customer.pr8,
          phone_number: this.state.customer.phone_number,
      }
      
      var config = {
        method: 'put',
        url: 'https://api.cc-recruitments.tech/user-api/CandidateProfile/',
        headers: { 
          'content-type': 'application/json',
          'X-CSRFToken': this.props.person.csrf
        },
        data: toSubmit,
        withCredentials: true
        };
        
      axios(config)
      .then(function (response) {
        if (response.status === 200) {
          window.alert("Profile updated successfully");
          window.location.replace("https://cc-recruitments.tech/");
        }
      })
        .catch(function (error) {
        window.alert("Something went wrong, please try again");
        console.log(error);
      });
        
      } else {
        window.alert("Please login again");
      }
    
        
    }
    


          // var config = {
          //   method: 'post',
          //   url: 'http://cc-api.eastus.cloudapp.azure.com/user-api/CandidateRegistration',
          //   headers: { 
          //     'Content-Type': 'application/json', 
          //   },
          //   data : this.state.customer
          // };

          // axios(config)
          // .then(function (response) {
          //   console.log(JSON.stringify(response.data));
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });

        }
      
  render() {
    const toRender = (this.props.loggedIn && this.props.person !==null) ? <div className="w-full flex items-center justify-center mt-10 mb-10 p-4 md:p-8">
      <Fade>
        <form className="reg-form">
          {/* <div className="flex font-bold justify-center mt-6">
          <img
            className="h-20 w-20"
            alt="#"
            src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
          />
        </div> */}
          <h2 className="text-3xl text-bold text-center text-white py-5 mt-8">
            Profile
          </h2>
          <div className="md:px-12 px-4 md:px-8` pb-10 text-white" >
            <div className="w-full mb-2 py-3" >
          
              <div className="flex items-center " >
            
                <i className="ml-3 fill-current text-white text-xs z-10 fas fa-user "></i>
              
                <input
                  type="text"
                  value={this.state.customer.name}
                  disabled
                  onChange={this.handleNameChanged.bind(this)}
                  placeholder="Name"
                  className="-ml-2 px-8  bg-transparent w-full border-b-2 border-red-500 border-teal-600 bg-teal-400 p-8 rounded px-3 py-2 border-black text-white focus:outline-none "
                />
              </div>
            </div>
            <div className="w-full mb-2 py-3">
          
              <div className="flex items-center">
                <i className="ml-3 fill-current text-white text-xs z-10 fas fa-lock"></i>
                <input
                  type="text"
                  disabled
                  value={this.state.customer.bits_email}
                  onChange={this.handleBitsEmailChanged.bind(this)}
                  placeholder="BITS Email"
                  className="-ml-2 px-8  bg-transparent w-full border-b-2 border-red-500 border-black-900 p-8 rounded px-3 py-2 border-black text-white focus:outline-none"
                />
              </div>
            </div>
            <div className="w-full mb-2 py-3">
          
            <div className="flex items-center">
              <i className="ml-3 fill-current text-white text-xs z-10 fas fa-user"></i>
              <input
                type="text"
                value={this.state.customer.phone_number}
                onChange={this.handlePhoneChanged.bind(this)}
                placeholder="Phone Number (WhatsApp)"
                className="-ml-2 px-8  bg-transparent w-full border-b-2 border-red-500 border-teal-600 bg-teal-400 p-8 rounded px-3 py-2 border-black text-white focus:outline-none"
              />
            </div>
      </div>
            <div className="w-full mb-2 py-3">
         
              <div className="flex items-center">
                <i className="ml-3 fill-current text-white text-xs z-10 fas fa-user"></i>
                <input
                  type="text"
                  value={this.state.customer.github}
                  onChange={this.handleGithubChanged.bind(this)}
                  placeholder="GitHub Profile Link (optional)"
                  className="-ml-2 px-8  bg-transparent w-full border-b-2 border-red-500 border-teal-600 bg-teal-400 p-8 rounded px-3 py-2 border-black text-white focus:outline-none"
                />
              </div>
            </div>
            {/*Select Gender :
          <div className="inline-flex">
            <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
            <div className="m-3">
              <select style={{background: "transparent", color: "white"}}  id="genderSelect" value={this.state.customer.gender} onChange={(e) => {
                var customer = this.state.customer;
                customer.gender = e.target.value;
                this.setState({ customer: customer });
              }}
                className="border-2 border-red-500 rounded h-10 pl-5 bg-black hover:border-gray-400">
              <option className="bg-ccblack" value="M">Male</option>
              <option className="bg-ccblack" value="F">Female</option>
              <option className="bg-ccblack" value="O">Non Binary</option>
            </select>
            </div>
            </div>*/}
            
            <div className="ml-4 md:ml-0 mb-2 mt-6 text-sm md:text-base">
              <div className="text-lg">BITS ID</div>
              <div className="flex items-center w-10/12">
                2021

                <div className="inline-flex">
                  <select style={{ background: "transparent", color: "white" }} id="branchSelect" value={this.state.customer.branch} onChange={(e) => {
                    var customer = this.state.customer;
                    customer.branch = e.target.value;
                    this.setState({ customer: customer });
                  }}
                    className="border-2 border-red-500 appearance-none rounded mx-1 p-1 md:mx-2 bg-black hover:border-gray-400">
                    <option className="bg-ccblack" value="A1">A1</option>
                    <option className="bg-ccblack" value="A2">A2</option>
                    <option className="bg-ccblack" value="A3">A3</option>
                    <option className="bg-ccblack" value="A4">A4</option>
                    <option className="bg-ccblack" value="A5">A5</option>
                    <option className="bg-ccblack" value="A7">A7</option>
                    <option className="bg-ccblack" value="A8">A8</option>
                    <option className="bg-ccblack" value="A9">A9</option>
                    <option className="bg-ccblack" value="AA">AA</option>
                    <option className="bg-ccblack" value="AB">AB</option>
                    <option className="bg-ccblack" value="B1">B1</option>
                    <option className="bg-ccblack" value="B2">B2</option>
                    <option className="bg-ccblack" value="B3">B3</option>
                    <option className="bg-ccblack" value="B4">B4</option>
                    <option className="bg-ccblack" value="B5">B5</option>
                    <option className="bg-ccblack" value="D2">D2</option>
                  </select>
                </div>
                
                <div className="inline-flex">
                  <select style={{ background: "transparent", color: "white" }} id="statusSelect" value={this.state.customer.status} onChange={(e) => {
                    var customer = this.state.customer;
                    customer.status = e.target.value;
                    this.setState({ customer: customer });
                  }}
                    className="border-2 border-red-500 appearance-none rounded mx-1 md:mx-2 p-1 bg-black hover:border-gray-400">
                    <option className="bg-ccblack" value="PS">PS</option>
                    <option className="bg-ccblack" value="TS">TS</option>
                  </select>
                </div>
                
                <div className="special w-3/4"><input
                  disabled
                  type="text"
                  value={this.state.customer.bits_id}
                  onChange={this.handleBitsIdChanged.bind(this)}
                  placeholder="FOUR DIGIT ID"
                  maxLength="4"
                  style={{
                    display: "inline-block",
                    width: "100%"
                  }}
                  className="bg-transparent border-b-2 border-red-500 border-teal-600 bg-teal-400 p-2 rounded text-white focus:outline-none"
                /></div> P
              </div>
            </div>
            <div className="ml-4 md:ml-0 `text-white mt-3 py-3">Arrange in decreasing order of your preference (Draggable)</div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }} className="text-white">
              <ReOrderableList
                //The unique identifier for this list. Should be unique from other lists and list groups.
                name='list2'
                //your list data
                list={this.state.prlist}
                //the list update callback
                onListUpdate={(newList) => {
                  this.setState({ prlist: newList });
                  var customer = this.state.customer;
                  customer.pr1 = this.depName(newList[0].id);
                  customer.pr2 = this.depName(newList[1].id);
                  customer.pr3 = this.depName(newList[2].id);
                  customer.pr4 = this.depName(newList[3].id);
                  customer.pr5 = this.depName(newList[4].id);
                  customer.pr6 = this.depName(newList[5].id);
                  customer.pr7 = this.depName(newList[6].id);
                  customer.pr8 = this.depName(newList[7].id);
                  this.setState({ customer: customer });
                }
                }
                style={{
                  width: '300px'
                }}
              >
                {this.state.prlist.map((data, index) => (
                  <ReOrderableItem key={`item-${index}`}>
                    <div
                      className="px-8 mt-2 mb-2 bg-transparent hover:border-gray-400 border-2 border-red-500 rounded px-3 py-2 text-white-700 focus:outline-none"
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      {data.name}
                    </div>
                  </ReOrderableItem>
                ))}
              </ReOrderableList>
            </div>
          
        
            {/* <a href="login" className="text-xs text-gray-500 float-right mb-4">Forgot github?</a> */}
            <button
              onClick={this.handleButtonClicked.bind(this)}
              className="w-full py-2 mt-5 rounded-full bg-red-500 text-gray-100 hover:bg-red-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </Fade>
    </div> : <Login />;
    return toRender;

    }
}