import React, { useState, useEffect } from "react"
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import CreateProps from "./createProps"
import { createComp } from "../../../actions/compActions";
import "./competitions.css"
import NavBar from "../../general/navBar";

const Trivia = (props) => {

  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [target, setTarget] = useState("");

  const comp = {
    name: props.location.compProps.name,
    manager: props.location.compProps.managerName,
    tyYpe: props.location.compProps.type,
    userList: props.location.compProps.userList,
    details: details,
    target: target,
    targetDate: date
  }
  useEffect(() => {
    console.log("product props is", props.location.compProps);
    console.log("comp!", comp)
  })

  const onchange = (data) => {
    setDetails(data)
  }
  const onChangeValue = (event) => {
    console.log(event.target.value);
  }
  function createFunc() {
    props.createComp(comp)
  }

  return (
    <div className="competitions-style">
      <NavBar className="competitions-nav"></NavBar>
      <div className="competitions-details">
        <div className="comp-father-div">
          <h1 className="comp-header-secondpage">{props.location.compProps.name}</h1>
          <div> <Link to={`/create/${props.user.userName}`}>  <button className="props-button">חזור</button></Link></div>
          <div className="competitions-list">
        <div className="competitions-list-header">השאלות</div>
        <div className="competitions-list-qes">שאלה 1</div>
        <div className="competitions-list-qes">שאלה 1</div>
        <div className="competitions-list-qes">שאלה 1</div>
        <div className="competitions-list-qes">שאלה 1</div>
        <div className="competitions-list-qes">שאלה 1</div>
      </div>
          <CreateProps onchange={(e) => { onchange(e) }}></CreateProps>
          <div className="comp-center-button">
            <div className="comp-label-target">הוספת שאלה</div>
            <input className="competitions-target-details" placeholder="כתוב את השאלה" onChange={event => setTarget(event.target.value)}></input>
            <div onChange={onChangeValue} className="trivia-div-radioButton">
              <div className="trivia-radios-button ">
              <input className="trivia-radio-button" type="radio" name="gender"></input><input className="trivia-radio-select" type="text" placeholder="תשובה אופציונאלית ראשונה" name="gender" />
              </div>
              <div className="trivia-radios-button ">
              <input className="trivia-radio-button" type="radio" name="gender"></input><input className="trivia-radio-select" type="text" placeholder="תשובה אופציונאלית שניה" name="gender" />
              </div>
              <div className="trivia-radios-button ">
              <input className="trivia-radio-button" type="radio" name="gender"></input> <input className="trivia-radio-select"  type="text" placeholder="תשובה אופציונאלית שלישית" name="gender" />
              </div>
              <button className="trivia-add-qes">הוספה</button>
            </div>
          </div>
          <div className="comp-center-button">
          <button className="comp-continue-button" onClick={() => { createFunc() }}>התחל תחרות</button>
          </div>
        </div>
        
      </div>
      
      </div>)

}

const mapStateToProps = (state) => {
  return {
    user: state.user.userActive,
    competitions: state.comp.competitions,
    error: state.user.loginError
  }
}

export default connect(mapStateToProps, { createComp })(Trivia);
//https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs