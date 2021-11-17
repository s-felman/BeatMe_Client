import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CreateProps from "./createProps";
import { Link } from 'react-router-dom';
import { createComp } from "../../../actions/compActions";
import Calendar from "react-calendar";
import Moment from 'moment';
import NavBar from "../../general/navBar";
import SelectDate from "../../general/selectDate";

const MultiTasks = (props) => {
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState(new Date());
  const [dateDiv, setDateDiv] = useState(false)
  const [data, setData] = useState();
  const [date2, setDate2] = useState("");
  const [value2, setValue2] = useState(new Date());
  const [dateDiv2, setDateDiv2] = useState(false)
  const [data2, setData2] = useState();

  useEffect(() => {
    setValue(value);
    console.log("ddd", value)
  })
  useEffect(() => {
    if (dateDiv) {
      setData(<Calendar className="comp-calander" onChange={onChange} value={value} calendarType="Hebrew" ></Calendar>);
    }
    else
      setData(null);
  }, [dateDiv])
  useEffect(() => {
    if (dateDiv2) {
      setData2(<Calendar className="comp-calander" onChange={onChange2} value={value2} calendarType="Hebrew" ></Calendar>);
    }
    else
      setData2(null);
  }, [dateDiv2])

  const [target, setTarget] = useState("");

  const comp = {
    name: props.location.compProps.name,
    manager: props.location.compProps.managerName,
    type: props.location.compProps.type,
    userList: props.location.compProps.userList,
    details: details,
    target: target,
    targetDate: date
  }


  const onchange = (data) => {
    setDetails(data)
  }

  function onChange(nextValue) {
    console.log("naet", nextValue)
    setValue(nextValue);
  }
  function onChange2(nextValue) {
    console.log("naet", nextValue)
    setValue2(nextValue);
  }
  Moment.locale('en');

  function createFunc() {
    props.createComp(comp)
  }

  return (<div className="competitions-style">
    <NavBar className="competitions-nav"></NavBar>

    <div className="competitions-details">
      <div className="comp-father-div">
        <h1 className="comp-header-secondpage">{props.location.compProps.name}</h1>
        <div> <Link to={`/create/${props.user.userName}`}>  <button className="props-button">חזור</button></Link></div>
        <CreateProps onchange={(e) => { onchange(e) }}></CreateProps>
        <div className="competitions-target">
          <div className="comp-label-target">יעד סופי</div>
          <div className="competitions-target-details-date" placeholder="תאריך" onChange={event => setDate(event.target.value)}> {Moment(value).format('DD-MM-yyyy')}
            <button className="search-icon" onClick={() => { !dateDiv ? setDateDiv(true) : setDateDiv(false) }}></button> </div>
          <div>{data}</div>
        </div>
        <input className="competitions-target-details" placeholder="פירוט" onChange={event => setTarget(event.target.value)}></input>
        <div className="competitions-target">
          <div className="comp-label-target">משימת אמצע</div>
          <div className="competitions-target-details-date" placeholder="תאריך" onChange2={event => setDate2(event.target.value)}> {Moment(value2).format('DD-MM-yyyy')}
            <button className="search-icon" onClick={() => { !dateDiv2 ? setDateDiv2(true) : setDateDiv2(false) }}></button>
          </div><br />
          <div>{data2}</div></div>
        <textarea className="competitions-details-next" placeholder="פירוט משימת אמצע"></textarea>
        <div className="comp-center-button">
          <button className="comp-continue-button" onClick={() => { createFunc() }}>התחל תחרות</button></div>
      </div></div>
  </div>)
}
const mapStateToProps = (state) => {
  return {
    user: state.user.userActive,
    competitions: state.comp.competitions,
    error: state.user.loginError
  }
}

export default connect(mapStateToProps, { createComp })(MultiTasks);
//https://www.npmjs.com/package/react-calendar