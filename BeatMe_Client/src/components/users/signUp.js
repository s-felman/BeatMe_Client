import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox } from "@material-ui/core";
import NavBar from "../general/navBar";
import { Link } from "react-router-dom";
import {signupAction} from '../../actions/usersActions';
import {findEmail} from '../../actions/usersActions';
import './signUp.css';


const SignUp=(props)=>{
    useEffect(()=>{
        
    })
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
    const [getEmail,setgetEmail]=useState(false);
    const [allOkey, setAllOkey]=useState(false)

    function fnameErrorFucntion(text){
        console.log("fname", text)
        if(text!==""){  
            setFNameError("");
            setFirstName(text);
            
            return true;
        }
        else {
            setFNameError("שדה חובה");
            setAllOkey(false)
            return false;
        }
    }
    function lnameErrorFucntion(text){
        console.log("lname", text)
        if(text!==""){       
            setLNameError("");
            setLastName(text);

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
            return true;
        }
    }

    function phoneErrorFuncion(text) {
        const phoneformat =/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/

        if(text.length >= 10){
            if(text.match(phoneformat)){
                setPhoneError("");
                setPhone(text);
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
        const mailformat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        if (text.length>=5) {
            //checks if this email exist
            
            fetch(`http://localhost:3000/users/getbyemail/${text}`).then((response)=> {
                return response.json();
            }).then((data)=> {
                console.log(data)
            if(data.message==="email exist"){
                setEmailError("כתובת מייל זו נמצאת בשימוש")
                setAllOkey(false)
                return false
            }});
            setEmailError("");
            setEmail(text);
            return true;
        }
        else {
            setEmailError("כתובת מייל אינה תקנית");
            setAllOkey(false)
            return false;
        }
    }
    function func(){
        props.signupAction(firstName, lastName, userName, phone, email, password, getEmail);
    }
    return(
      <div>
          <NavBar></NavBar>
          <form>
              <label className=".signUp-title">יצירת חשבון</label> 
              <label className="signUp-firstName-text" required>שם פרטי</label>
              <input className="signUp-firstName" type="text" id="firstName" 
              onChange={(e)=>fnameErrorFucntion(e.target.value)}></input><br/><br/>
              <span className='error'>{ fnameError }</span><br/>
              <label className="signUp-lastName-text">שם משפחה</label>
              <input className="signUp-lastName" type="text" 
              onChange={(e)=>lnameErrorFucntion(e.target.value)}
              ></input><br/><br/>
              <span className='error'>{ lnameError }</span><br/>
              <label className="signUp-userName-text">שם משתמש</label>
              <input className="signUp-userName" type="text" name="UserName" 
              onChange={(e)=>unameErrorFucntion(e.target.value)}
              ></input><br/><br/>
              <span className='error'>{ unameError }</span><br/>
              <label className="signUp-phone-text">טלפון</label>
              <input className="signUp-phone" type="text" 
              onChange={(e)=>phoneErrorFuncion(e.target.value)}
              ></input><br/><br/>
              <span className='error'>{ phoneError }</span><br/>
              <label className="signUp-email-text">כתובת מייל</label>
              <input className="signUp-email" type="email" 
              onChange={(e)=>emailErrorFunction(e.target.value)}
              ></input><br/><br/>
              <span className='error'>{ emailError }</span><br/>
              <label className="signUp-password-text">סיסמא</label>
              <input className="signUp-password" type="password" 
              onChange={(e)=>passwordErrorFunction(e.target.value)}
              ></input><br/><br/>
              <span className='error'>{ passwordError }</span><br/>
              <label className="signUp-checkbox-text">אישור קבלת הודעות במייל</label>
              <Checkbox className="signUp-checkbox" id="getEmail" 
              onChange={(e)=>setgetEmail(e.target.value)}
              ></Checkbox><br/>
              <button className="signUp-enterUser" type="submit" onClick={func}>רישום </button><br/><br/>
              <Link to="/userlogin" className=".enter-loginUser">משתמש קיים? היכנס</Link>
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