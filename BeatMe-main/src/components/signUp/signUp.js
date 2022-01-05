import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox } from "@material-ui/core";
import NavBar from "../navBar/navBar";
import { Link } from "react-router-dom";

const SignUp=()=>{

    const [nameError,setNameError]=useState()
    const [emailError,setEmailError]=useState()
    const [passwordError,setPasswordError]=useState()

    function required(text){
        if(text=""){
        setNameError("שדה חובה");
        return false;
        }
        else {
            return true;
        }
    }

    function password(text) {
        if (text.length < 6) {
            setPasswordError("הסיסמא חייבת להכיל לפחות 6 תווים");
            return false;
        }
        else {
            return true;
        }
    }

    // function email(inputtxt) {
    //     const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
    //     if (inputtxt.match(mailformat)) {
    //         //checks if this email exist
    //         const temp=AccountsList.accountsList.filter(account=>account.email===inputtxt)
    //         if(temp.length>0){
    //         setEmailError("כתובת מייל זו נמצאת בשימוש")
    //         return false}
    //         return true;
    //     }
    //     else {
    //         setEmailError("כתובת מייל אינה תקנית");
    //         return false;
    //     }
    // }

    return(
      <div>
          <NavBar></NavBar>
          <form>
          <br/> 
              <label required>שם משפחה</label>
              <input type="text" ></input><br/><br/>
              <label>שם פרטי</label>
              <input type="text" ></input><br/><br/>
              <label>שם משתמש</label>
              <input type="text" name="UserName"></input><br/><br/>
              <label>טלפון</label>
              <input type="text" ></input><br/><br/>
              <label>כתובת מייל</label>
              <input type="email"></input><br/><br/>
              <label>סיסמא</label>
              <input type="password" ></input><br/>
              <label>אני מאשר קבלת מיילים</label>
              <Checkbox></Checkbox><br/>
              <button type="submit" onClick="hhhjhjhjgh">רישום </button><br/><br/>
              <Link to="/userlogin">משתמש קיים</Link>

          </form>
      </div>  
    )

}
export default SignUp