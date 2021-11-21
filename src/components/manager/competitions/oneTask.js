import React, {useEffect, useState} from "react"
import { connect } from "react-redux";
import CreateProps from "./createProps";    
import { createComp } from "../../../actions/compActions";
import Select from 'react-select';
import "./competitions.css"
import { Link } from 'react-router-dom';
import NavBar from "../../general/navBar";
import SelectDate from "../../general/selectDate";

const options = [
  { value: 'חודש', label: 'חודש' },
  { value: 'שבוע', label: 'שבוע' },
  { value: 'יום', label: 'יום' }
]


const OneTask=(props)=>{
    const [details, setDetails]= useState("");
    const [date, setDate]=useState(new Date());
    const [target, setTarget]= useState("");
    const [typeProps, setTypeProps] = useState([]);
    
    const comp = {
      compName: props.location.compProps.name,
      adminId: props.user._id,
      compType: props.location.compProps.type,
      usersList: props.location.compProps.userList,
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

    function createFunc(){
      props.createComp( props.user._id , comp)
    }
        return(
        <div className="competitions-style">
           <NavBar className="competitions-nav"></NavBar>
      <div className="competitions-details">
        <div className="comp-father-div">
          <h1  className="comp-header-secondpage">{props.location.compProps.name}</h1>
          <div> <Link to={`/create/${props.user._id}`}>  <button className="props-button">חזור</button></Link></div>
            <CreateProps onchange={(e) => { onchange(e) }}></CreateProps>
            <div className="oneTask-target">
          <div className="comp-label-target">יעד סופי</div>
          <SelectDate change={(e)=>{onChangeDate(e)}}></SelectDate>
        </div>
            {/* <label>רוצה לקבל תזכורת אחת ל</label>
            <Select options={options} className="oneTask-select"/> */}
            <div className="comp-center-button">
          <button className="comp-continue-button" onClick={() => { createFunc() }}>התחל תחרות</button>
          </div>    </div>
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

export default connect(mapStateToProps, { createComp })(OneTask);
//https://react-select.com/home