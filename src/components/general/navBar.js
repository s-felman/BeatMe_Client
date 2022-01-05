import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./navBar.css"
import logo from "../../static/images/logo.png"
import { connect } from "react-redux";
import { getUserAction } from "../../actions/usersActions";
import { logoutAction } from "../../actions/usersActions";

function NavBar(props) {
  const [isLogged, setIsLogged] = useState('כניסה')
  const [toLogin, setLogin] = useState('/userlogin')
  const [logout, setLogout] = useState('')
  // useEffect(() => {
  //   setIsLogged("כניסה")
  //     setLogin("/userlogin")
  // },[]);
  useEffect(() => {
    if (localStorage.getItem('user') !== 'undefined') {
      var u = localStorage.getItem('user');
      u = JSON.parse(u)
      setIsLogged(u.userName)
      setLogout('יציאה')
      setLogin(`/participant/${u._id}`)
      if (props.user === null) {
        props.getUserAction(u._id);
      }
    }
    if( props.user.userName===null){
    setIsLogged('כניסה')
    setLogout('')
  }
  },[props]);

  useEffect(() => {
    if (logout === '/') {
      localStorage.setItem('isLogged', 'false')
      localStorage.setItem('user', 'undefined')
    }
  }, [logout])

  return (
    <div className="navBar">
      <Link to={{ pathname: `${toLogin}`, state: { to: 'participant' } }} >
        <button >{isLogged}</button>
      </Link>
      <a href="/" >
        <button onClick={() => { logoutAction(); }} > {logout} </button>
      </a>
      {/* <input className="search"></input>
      <button className="search-icon"></button> */}
      <a href="/create" className="links">צור תחרות</a>
      <a href="/create" className="links">המנצחים</a>
      <a href="compList" className="links">התחרויות</a>
      <a href="/" className="logo"><img alt="BeatMe_logo" src={logo}></img></a>

    </div>
  );
}
const mapStateToProps = (state) => {

  return {
    user: state.user.userActive,
    isLogged: state.user.isLogged
  }
}
export default connect(mapStateToProps, { getUserAction, logoutAction })(NavBar);
