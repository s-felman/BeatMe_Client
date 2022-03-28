import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CreateProps from "./createProps";
import { Link } from 'react-router-dom';
import { createComp } from "../../../actions/compActions";
import { getUserAction } from "../../../actions/usersActions"
import Calendar from "react-calendar";
import Moment from 'moment';
import NavBar from "../../general/navBar";

const MultiTasks = (props) => {
  const [details, setDetails] = useState("");
  const [target, setTarget] = useState("");
  const [lowTarget, setLowTarget] = useState("");
  const [typeProps, setTypeProps] = useState([]);
  const [value, setValue] = useState(new Date());
  const [dateDiv, setDateDiv] = useState(false)
  const [data, setData] = useState();
  const [taskTarget, setTaskTarget] = useState('');
  const [value2, setValue2] = useState(new Date());
  const [dateDiv2, setDateDiv2] = useState(false)
  const [data2, setData2] = useState();
  const [change] = useState(false)
  const [ add,] = useState('שמירה')
  const [save, setSave] = useState('')
  const [form, setForm] = useState(new FormData())

  useEffect(() => {
    if (props.location.compProps !== undefined) {
      localStorage.setItem("usersList", props.location.compProps.userList)
    }
    if (props.user.userName === null) {
      props.getUserAction(JSON.parse(localStorage.getItem("user"))._id)
    }
  },[props])
  
  const comp = {
    compName: localStorage.getItem("compName"),
    adminId: props.user._id,
    compType: '/'+window.location.pathname.split("/")[1],
    usersList: localStorage.getItem("usersList"),
    details: details,
    target: target,
    targetDate: value,
    typeProps: typeProps
  }

  useEffect(() => {
    setValue(value);
  },[value])

  useEffect(() => {
    if (dateDiv) {
      setData(<Calendar className="comp-calander" onChange={onChange} value={value} calendarType="Hebrew" ></Calendar>);
    }
    else
      setData(null);
  }, [dateDiv, value])

  useEffect(() => {
    if (dateDiv2) {
      setData2(<Calendar className="comp-calander" onChange={onChange2} value={value2} calendarType="Hebrew" ></Calendar>);
    }
    else
      setData2(null);
  }, [dateDiv2, value2])

  const onchange = (data) => {setDetails(data)}

  function onChange(nextValue) {setValue(nextValue);}

  function onChange2(nextValue) {setValue2(nextValue);}
  
  Moment.locale('en');
   
  const onImg=(data)=>{setForm(data)}

  function createFunc() {
    form.append("compName", comp.compName)
    form.append("adminId", comp.adminId)
    form.append("compType", comp.compType)
    form.append("details", comp.details)
    form.append("target", comp.target)
    form.append("targetDate", comp.targetDate)
    form.append("usersList", comp.usersList)
    form.append("typeProps", JSON.stringify(comp.typeProps))
    props.createComp(form);
    setForm(new FormData())
  }

  function addTask() {
    if (!change) {
      const task = { lowTarget: lowTarget, date: value2, details: taskTarget };
      setTypeProps([...typeProps, task]);
      setValue2(new Date())
      setTaskTarget('')
      setLowTarget('')
      setDateDiv2(false)
    }
  }

  function changeQ() {
    typeProps.forEach(i => {
      if (i.lowTarget === save) {
        i.taskTarget = taskTarget;
        i.value2 = value2;
        i.lowTarget = lowTarget;
        return
      }
    });
  };
  const listQ = typeProps.map(p => {
    return (
      <div className="mt-list-div">
        <div >{p.lowTarget}</div>
        <button onClick={() => {
          changeQ(); setSave(p.lowTarget); setTaskTarget(p.details); setLowTarget(p.lowTarget)
          setValue2(p.date);
        }}
          className="votes-list-button" > עריכה </button>
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
            <div className="competitions-list-header">משימות אמצע</div>
            <div className="competitions-listQ" >{listQ!== null? listQ:  'כרגע אין לך משימות'}</div>
          </div>
          <CreateProps onchange={(e) => { onchange(e) }} onImg={(e)=>{ onImg(e)}}></CreateProps>
          <div className="competitions-target">
            <div className="competition-end-target">
              <div className="comp-label-target">יעד סופי</div>
              <div className="competitions-target-details-date" > {Moment(value).format('DD-MM-yyyy')}
                <button className="search-icon" onClick={() => { !dateDiv ? setDateDiv(true) : setDateDiv(false) }}></button> </div>

            </div >
            <input className="competitions-target-details" placeholder="פירוט" onChange={event => setTarget(event.target.value)}></input>
          </div><div>{data}</div>
          <div className="votes-div">
            <div className="mt-add-div">
              <div className="comp-props">
                <div className="comp-label-target">משימת אמצע</div>
                <div className="competitions-target-details-date"> {Moment(value2).format('DD-MM-yyyy')}
                  <button className="search-icon" onClick={() => { !dateDiv2 ? setDateDiv2(true) : setDateDiv2(false) }}></button><br />
                </div></div><br />
              <input className="competitions-target-m-details" value={lowTarget} placeholder="שם משימה" onChange={event => setLowTarget(event.target.value)}></input>
              <div>
                <textarea className="competitions-target-m-details" value={taskTarget}
                  placeholder="פירוט משימת אמצע" onChange={event => setTaskTarget(event.target.value)}></textarea>

              </div>    <button className="votes-button" onClick={() => { addTask() }}>{add}</button></div>
            <div>{data2}</div>
          </div>
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

export default connect(mapStateToProps, { getUserAction, createComp })(MultiTasks);
//https://www.npmjs.com/package/react-calendar