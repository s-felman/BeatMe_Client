import React, { useState} from "react";
import { connect } from "react-redux";
import NavBar from "../general/navBar";
import { Link } from "react-router-dom";
import {signupAction} from '../../actions/usersActions';
import './signUp.css';


const SignUp=(props)=>{

    const [fnameError,setFNameError]=useState("");
    const [lnameError,setLNameError]=useState("");
    const [unameError,setUNameError]=useState("");
    const [emailError,setEmailError]=useState("");
    const [passwordError,setPasswordError]=useState("");
    const [phoneError,setPhoneError]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [userName,setUserName]=useState("");
    const [phone,setPhone]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [allOkey ,setAllOkey]=useState(false)

    function fnameErrorFucntion(text){
        if(text!==""){  
            setFNameError("");
            setFirstName(text);
            setAllOkey(true)
            return true;
        }
        else {
            setFNameError("שדה חובה");
            setAllOkey(false)
            return false;
        }
    }
    function lnameErrorFucntion(text){
        if(text!==""){       
            setLNameError("");
            setLastName(text);
            setAllOkey(true)
            return true;
        }
        else {
            setLNameError("שדה חובה");
            setAllOkey(false)
            return false;
        }
    }
    function unameErrorFucntion(text){
        if(text!==""){   
            fetch(`http://localhost:3000/users/getbyusername/${text}`).then((response)=> {
                return response.json();
            }).then((data)=> {
            if(data.message==="username exist"){
                setUNameError("שם משתמש נמצא בשימוש")
                setAllOkey(false)
                return false
            }});         
            setUNameError("");
            setUserName(text);
            setAllOkey(true)
            return true;
        }
        else {
            setUNameError("שדה חובה");
            setAllOkey(false)
            return false;
        }
    }

    function passwordErrorFunction(text) {
        if (text.length < 6) {
            setPasswordError("הסיסמא חייבת להכיל לפחות 6 תווים");
            setAllOkey(false)
            return false;
        }
        else {
            setPasswordError("")
            setPassword(text);
            setAllOkey(true)
            return true;
        }
    }

    function phoneErrorFuncion(text) {
        const phoneformat =/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/

        if(text.length >= 10){
            if(text.match(phoneformat)){
                setPhoneError("");
                setPhone(text);
                setAllOkey(true)
                return true;
            }
            else{
                setPhoneError("מספר פלאפון לא תקין");
                setAllOkey(false)
                return false;
            }
        }
}

    function emailErrorFunction(text) {
        // const mailformat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        if (text.length>=5) {
            //checks if this email exist
            
            fetch(`http://localhost:3000/users/getbyemail/${text}`).then((response)=> {
                return response.json();
            }).then((data)=> {
            if(data.message==="email exist"){
                setEmailError("כתובת מייל זו נמצאת בשימוש")
                setAllOkey(false)
                return false
            }});
            setEmailError("");
            setEmail(text);
            setAllOkey(true)
            return true;
        }
        else {
            setEmailError("כתובת מייל אינה תקנית");
            setAllOkey(false)
            return false;
        }
    }
     function func(){
        if(allOkey)
        debugger
        props.signupAction(firstName, lastName, userName, phone, email, password)
        
        
        
    }
    return(
      <div>
          <NavBar></NavBar>
          <form className="form-login">
              <label className="titles-login">יצירת חשבון</label> 
              <Link to="/userlogin" className="go-to-new">משתמש קיים? היכנס</Link>
              <input className="insert-props" type="text" placeholder="שם פרטי" id="firstName" 
              onChange={(e)=>fnameErrorFucntion(e.target.value)}></input>
              <span className='error'>{ fnameError }</span>
              <input className="insert-props" type="text" placeholder='שם משפחה'
              onChange={(e)=>lnameErrorFucntion(e.target.value)}
              ></input>
              <span className='error'>{ lnameError }</span>
              <input className="insert-props" type="text" placeholder='שם משתמש' name="UserName" 
              onChange={(e)=>unameErrorFucntion(e.target.value)}
              ></input>
              <span className='error'>{ unameError }</span>
              <input className="insert-props" type="text" placeholder='טלפון'
              onChange={(e)=>phoneErrorFuncion(e.target.value)}
              ></input>
              <span className='error'>{ phoneError }</span>
              <input className="insert-props" type="email" placeholder='כתובת מייל'
              onChange={(e)=>emailErrorFunction(e.target.value)}
              ></input>
              <span className='error'>{ emailError }</span>
              <input className="insert-props" type="password" placeholder='סיסמא'
              onChange={(e)=>passwordErrorFunction(e.target.value)}
              ></input>
              <span className='error'>{ passwordError }</span>
              <button className="button-login" type="submit" onClick={()=>func()} disabled={!allOkey}>רישום </button>
              
          </form>
      </div>  
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.user.userActive,
        competitions: state.comp.competitions,
        error: state.user.error
    }
}

export default connect(mapStateToProps, { signupAction })(SignUp);