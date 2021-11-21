import React, { useState, useEffect } from "react"
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import CreateProps from "./createProps";
import {getUserAction} from "../../../actions/usersActions"
import { createComp } from "../../../actions/compActions";
import "./competitions.css"
import NavBar from "../../general/navBar";

const Trivia = (props) => {

  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [target, setTarget] = useState("");
  const [typeProps, setTypeProps] = useState([]);
  const [question, setQuestion]= useState('')
  const [option1, setOption1]= useState('')
  const [option2, setOption2]= useState('')
  const [option3, setOption3]= useState('')

    useEffect(() => {

      if(props.location.compProps!==undefined){
        localStorage.setItem("usersList", props.location.compProps.userList)
      }
    if( props.user.userName===null){
      props.getUserAction(JSON.parse(localStorage.getItem("user"))._id)
    }

  });
  const comp = {
    compName: localStorage.getItem("compName"),
    adminId: props.user._id,
    compType: props.location.state.type,
    usersList: localStorage.getItem("usersList"),
    details: details,
    target: target,
    targetDate: date,
    typeProps: typeProps
  }

  useEffect(() => {
    console.log("product props is", props.location);
    console.log("comp!", comp)
  })

  const onchange = (data) => {
    setDetails(data)
  }

  function createFunc() {
    props.createComp(props.user._id,comp)
  }

  function addQ(){
    const qe = {question:question, option1: option1, option2: option2, option3: option3 };
    setTypeProps([...typeProps, qe]);
    localStorage.setItem("compName", " ")
  }
  const listQ= typeProps.map(p => {
    return (
        <div >
      <button onClick={()=>{setQuestion(p.question)}} className="competitions-list-qes">{p.question}</button>
        </div>
    )
})
  return (
    <div className="competitions-style">
      <NavBar className="competitions-nav"></NavBar>
      <div className="competitions-details">
        <div className="comp-father-div">
          <h1 className="comp-header-secondpage">{localStorage.getItem("compName")}</h1>
          <div> <Link to={`/create/${props.user._id}`}>  <button className="props-button">חזור</button></Link></div>
          <div className="competitions-list">
          <div className="competitions-list-header">השאלות</div>
        {listQ}
      </div>
          <CreateProps onchange={(e) => { onchange(e) }}></CreateProps>
          <div className="comp-center-button">
            <div className="comp-label-target">הוספת שאלה</div>
            <input className="competitions-target-details" value={question} placeholder="כתוב את השאלה" onChange={event => setQuestion(event.target.value)}></input>
            <div  className="trivia-div-radioButton">
              <div className="trivia-radios-button ">
              <input className="trivia-radio-button" type="radio" name="gender"></input>
              <input className="trivia-radio-select" type="text" value={option1} onChange={event => setOption1(event.target.value)}
              placeholder="תשובה אופציונאלית ראשונה" name="gender" />
              </div>
              <div className="trivia-radios-button ">
              <input className="trivia-radio-button" type="radio" name="gender"></input>
              <input className="trivia-radio-select" type="text" value={option2} onChange={event => setOption2(event.target.value)}
              placeholder="תשובה אופציונאלית שניה" name="gender" />
              </div>
              <div className="trivia-radios-button ">
              <input className="trivia-radio-button" type="radio" name="gender"></input> 
              <input className="trivia-radio-select"  type="text" value={option3} onChange={event => setOption3(event.target.value)}
              placeholder="תשובה אופציונאלית שלישית" name="gender" />
              </div>
              <button className="trivia-add-qes" onClick={()=>{addQ(); setQuestion(""); setOption1(""); setOption2("");setOption3("")}}>הוספה</button>
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

export default connect(mapStateToProps, { getUserAction,createComp })(Trivia);
//https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs