import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CreateProps from "./createProps";
import { Link } from 'react-router-dom';
import { createComp } from "../../../actions/compActions";
import Calendar from "react-calendar";
import Moment from 'moment';
import NavBar from "../../general/navBar";
import SelectDate from "../../general/selectDate";
//import { Box } from "@material-ui/core";

const MultiTasks = (props) => {
  const comp = {
    compName: props.location.compProps.name,
    adminId: props.user._id,
    compType: props.location.compProps.type,
    usersList: props.location.compProps.userList,
    details: details,
    target: target,
    targetDate: value,
    typeProps: typeProps
  }


  return (<div className="competitions-style">
    <NavBar className="competitions-nav"></NavBar>
    <div className="competitions-details">
      <div className="comp-father-div">
        <h1 className="comp-header-secondpage">{props.location.compProps.name}</h1>
        <div> <Link to={`/participant/${props.user._id}`}>  <button className="props-button">חזור</button></Link></div>
        <div className="comp-details">{props.comp.details}</div>
        <div className="comp-image">{props.comp.image}</div>
        <div className="competitions-target">
          <div className="comp-label-target">יעד סופי</div>
          <div className="competitions-target-details-date" > {props.comp.targetDate}
        </div >
        <div className="comp-mark">
            <label>עמדתי במשימה היומית</label>
            <Checkbox className="comp-multTask-checkbox" id="answerMaltTask" 
              onChange={(e)=>answerMaltTask(e.comp.answerMaltTask)}
              ></Checkbox><br/>
        </div>
        <div className="top-left">
            <div className="comp-userName">{props.user.name}</div>
            <div className="comp-userImage">{props.user.image}</div>
            <div>יש לך {props.user.points} נקודות</div>
        </div>
      </div></div>
    </div>
  </div>)
}
const mapStateToProps = (state) => {
  return {
    user: state.user.userActive,
    competitions: state.comp.competitions,
  }
}

export default connect(mapStateToProps)(MultiTasks);
//https://www.npmjs.com/package/react-calendar