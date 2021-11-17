import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CreateProps from "./createProps"
import { Link } from 'react-router-dom';
import { createComp } from "../../../actions/compActions";
import NavBar from "../../general/navBar";
import ImageUpload from "../../general/imageUploud";


const Votes = (props) => {


  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [target, setTarget] = useState("");
  const [img, setImg] = useState(false);
  const [upload, setUpload] = useState()

  const comp =
  {
    name: props.location.compProps.name,
    adminId: props.location.compProps.managerId,
    compType: props.location.compProps.type,
    userList: props.location.compProps.userList,
    details: details,
    target: target,
    targetDate: date

  }
  useEffect(() => {
    if (img) {
        setUpload(<ImageUpload ontake={(e) => { onchange(e) }}></ImageUpload>);
    }
    else
        setUpload(null);
}, [img])
  useEffect(() => {
    console.log("product props is", props.location.compProps);
    console.log("comp!", comp)
  })

  const onchange = (data) => {
    setDetails(data)
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
        <div className="competitions-list-header">פריטים קיימים להצבעה</div>
  <div className="competitions-list-qes">שאלה 1</div>
        <div className="competitions-list-qes">שאלה 1</div>
        <div className="competitions-list-qes">שאלה 1</div>
      </div>
          <CreateProps onchange={(e) => { onchange(e) }}></CreateProps>
        
          <div className="comp-center-button">
            <div className="comp-label-target">הוספת פריט להצבעה</div>
            
            <div className="votes-add-div"> 
            <div className="votes-div">
            <button className="votes-add-img" onClick={() => { !img ? setImg(true) : setImg(false) }} >העלה תמונת מוצר</button>
           
            <div className="votes-input-div">
              <input className="votes-input" placeholder="שם מוצר"></input>
              <input className="votes-input"  placeholder="פירוט"></input>
            </div></div>
            <button className="votes-button">הוספה</button>
            </div>
             <div className="comp-uploud">{upload}</div>
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

export default connect(mapStateToProps, { createComp })(Votes);