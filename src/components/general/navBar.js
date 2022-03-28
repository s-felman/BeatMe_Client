import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./navBar.css"
import logo from "../../static/images/logo.png"
import { connect } from "react-redux";
import { getUserAction } from "../../actions/usersActions";
import { logoutAction } from "../../actions/usersActions";
import Select from 'react-select';


function NavBar(props) {
  const [isLogged, setIsLogged] = useState('כניסה')
  const [toLogin, setLogin] = useState('/userlogin')
  const [logout, setLogout] = useState('הרשמה')

  const option = [
    {
      value: 'isLogged',
      label: (<Link to={{ pathname: `${toLogin}`, state: { to: 'participant' } }} >
        <button className="nav-button">{isLogged}</button></Link>)
    },
    {
      value: 'logout',
      label: (
        <Link to={logout === 'הרשמה' ?{ pathname: '/signup' }:{ pathname: '/' }} >
          <button className="nav-button" onClick={logout !== 'הרשמה' ?() => { logoutAction()}:()=>{}} > {logout} </button>
        </Link>
      )
    },
  ]
  useEffect(() => {
    if (localStorage.length !== 0)
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
    if (props.user.userName === null) {
      setIsLogged('כניסה')
      setLogout('הרשמה')
    }
  }, [props]);

  useEffect(() => {
    if (logout === '/') {
      localStorage.setItem('isLogged', 'false')
      localStorage.setItem('user', 'undefined')
    }
  }, [logout])

  return (
    <div className="navBar">
      <div className="nav-flex">
        <div style={{ display: 'flex', gap: '20px' }}>

        </div>
        {/* <input className="search"></input>
      <button className="search-icon"></button> */}

      </div>
      <div className="nav-flex">
        <Select
          // value={options.filter(
          //   (option) => option.value === companyDetailsStore.formInitialValues?.userLocale.locale
          // )}
          value={option.filter((option) => option.label==='isLogged')}
          options={option}
          classNamePrefix="react-select"
          className='selectButton'
          label={isLogged}
          placeholder={isLogged}
          // className={styles.selectLanguage}
          // menuIsOpen={true}

          onChange={(e) => {

          }}
        >
        </Select>
        <a href={`/create/${props.user._id}`} className="links">צור תחרות</a>
        <a href={`/participant/${props.user._id}`} className="links">my beats</a>
        <a href="/competitions" className="links">התחרויות</a>
        <a href="/" className="logo"><img alt="BeatMe_logo" src={logo}></img></a>
      </div>
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
