import React, { useState, useEffect,  useReducer } from "react";
import { Link } from 'react-router-dom';
import "./navBar.css"
import logo from "../../static/images/logo.png"
import {connect} from "react-redux";
import {getUserAction} from "../../actions/usersActions";
import {logoutAction} from "../../actions/usersActions";

function NavBar(props){
  const [isLogged , setIsLogged] = useState('כניסה') 
  const [toLogin, setLogin]= useState('/userlogin')

  // useEffect(() => {
  //   setIsLogged("כניסה")
  //     setLogin("/userlogin")
  // },[]);
  useEffect(() => {
    if(localStorage.getItem('user')!=='undefined'){
      var u= localStorage.getItem('user');
      u=JSON.parse(u)
      setIsLogged(u.userName)
    setLogin(`/participant/${u._id}`)
    if(props.user===null){
      props.getUserAction(u._id);
    }
    }
    
  //   else
  //   if((props.user).length!===0){
  //     setIsLogged(props.user.userName)
  //     setLogin(`/participant/${props.user.userName}`)
  //     console.log("toLogin", toLogin, "isLogged", isLogged)
  // }
  // else
  //   if((props.user).length====0||localStorage.getItem('user')==='undefined'){
  //     setIsLogged("כניסה")
  //     setLogin("/userlogin")
  //   }
    
  });

 return(
<div className="navBar">
<Link to={{ pathname: `${toLogin}`, state: { to: 'participant' } }} >
  <button >{isLogged}</button>
 </Link>
 <Link to={{ pathname: '/'}} >
  <button onClick={logoutAction} > logout </button>
 </Link>
  <input className="search"></input>
  <button className="search-icon"></button>  
  <a href="/create" className="links">צור תחרות</a>
  <a href="/create" className="links">המנצחים</a>
  <a href="/create" className="links">התחרויות</a>
  <a  href="/" className="logo"><img alt="BeatMe_logo" src={logo}></img></a>
 
</div>
 );   
}
const mapStateToProps=(state)=>{

  return{
      user: state.user.userActive,
      isLogged: state.user.isLogged
  }
}
export default connect(mapStateToProps,{getUserAction, logoutAction})(NavBar); 
