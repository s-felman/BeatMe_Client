import React, { useEffect, useState } from "react"
import { connect } from "react-redux";
import CreateProps from "./createProps";
import { getUserAction } from "../../../actions/usersActions";
import { createComp } from "../../../actions/compActions";
import "./competitions.css"
import { Link } from 'react-router-dom';
import NavBar from "../../general/navBar";
import SelectDate from "../../general/selectDate";

const OneTask = (props) => {
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [target] = useState("");
  const [typeProps] = useState([]);
  const [form, setForm] = useState(new FormData())

  useEffect(() => {
    if (props.location.compProps !== undefined) {
      localStorage.setItem("usersList", props.location.compProps.userList)
    }
    if (props.user.userName === null) {
      props.getUserAction(JSON.parse(localStorage.getItem("user"))._id)
    }
  })

  const comp = {
    compName: localStorage.getItem("compName"),
    adminId: props.user._id,
    compType: '/'+window.location.pathname.split("/")[1],
    usersList: localStorage.getItem("usersList"),
    details: details,
    target: target,
    targetDate: date,
    typeProps: typeProps
  }


  const onchange = (data) => {
    setDetails(data)
  }

  const onChangeDate = (data) => {
    setDate(data)
  }
  const onImg = (data) => { setForm(data) }

  function createFunc() {
    debugger
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



  return (
    <div className="competitions-ot-style">
      <NavBar className="competitions-nav"></NavBar>
      <div className="competitions-ot-details">
        <div className="comp-father-div">
          <h1 className="comp-header-secondpage">{localStorage.getItem("compName")}</h1>
          <div> <Link to={`/create/${props.user._id}`}>  <button className="props-button">חזור</button></Link></div>
          <CreateProps onchange={(e) => { onchange(e) }} onImg={(e) => { onImg(e) }}></CreateProps>
          <div className="oneTask-target">
            <div className="comp-label-target">יעד סופי</div>
            <SelectDate change={(e) => { onChangeDate(e) }}></SelectDate>
          </div>
          <div className="comp-center-button">
            <button className="comp-continue-button" onClick={() => { createFunc() }}>התחל תחרות</button>
          </div>    
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.user.userActive,
    competitions: state.comp.competitions,
    error: state.user.loginError
  }
}

export default connect(mapStateToProps, {getUserAction ,createComp })(OneTask);
//https://react-select.com/home