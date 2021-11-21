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
  const [target, setTarget] = useState("");
  const [typeProps, setTypeProps] = useState([]);
  const [value, setValue] = useState(new Date());
  const [dateDiv, setDateDiv] = useState(false)
  const [data, setData] = useState();
  const [taskTarget, setTaskTarget] = useState('');
  const [value2, setValue2] = useState(new Date());
  const [dateDiv2, setDateDiv2] = useState(false)
  const [data2, setData2] = useState();

  useEffect(() => {
    setValue(value);
    console.log(comp)
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
    props.createComp(props.user._id,comp)
  }

  function addTask(){
    const task = { date: value2, details: taskTarget };
          setTypeProps([...typeProps, task]);
          setValue2(new Date())
          setTaskTarget('')
          localStorage.setItem("compName", "")
  }
  return (<div className="competitions-style">
    <NavBar className="competitions-nav"></NavBar>

    <div className="competitions-details">
      <div className="comp-father-div">
        <h1 className="comp-header-secondpage">{props.location.compProps.name}</h1>
        <div> <Link to={`/create/${props.user._id}`}>  <button className="props-button">חזור</button></Link></div>
        <CreateProps onchange={(e) => { onchange(e) }}></CreateProps>
        <div className="competitions-target">
          <div className="comp-label-target">יעד סופי</div>
          <div className="competitions-target-details-date" > {Moment(value).format('DD-MM-yyyy')}
            <button className="search-icon" onClick={() => { !dateDiv ? setDateDiv(true) : setDateDiv(false) }}></button> </div>
            <br /> <div>{data}</div><br />
        </div >
        <input className="competitions-target-details" placeholder="פירוט" onChange={event => setTarget(event.target.value)}></input>
        <div className="votes-add-div">
        <div className="competitions-target">
          <div className="comp-label-target">משימת אמצע</div>
          <div className="competitions-target-details-date"> {Moment(value2).format('DD-MM-yyyy')}
            <button className="search-icon" onClick={() => { !dateDiv2 ? setDateDiv2(true) : setDateDiv2(false) }}></button><br />
          </div><br />
          <div></div>
          <div>{data2}</div>
          </div>
        <textarea className="competitions-details-next" placeholder="פירוט משימת אמצע" onChange={event => setTaskTarget(event.target.value)}></textarea> 
        <button className="votes-button" onClick={()=>{addTask()}}>הגש</button></div>
        <div className="comp-center-button">
          <button className="comp-continue-button" onClick={() => { createFunc() }}>התחל תחרות</button></div>
      </div></div>
  </div>)
}
const mapStateToProps = (state) => {
  return {
    user: state.user.userActive,
    competitions: state.comp.competitions,
  }
}

export default connect(mapStateToProps, { createComp })(MultiTasks);
//https://www.npmjs.com/package/react-calendar