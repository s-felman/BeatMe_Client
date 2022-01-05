import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CreateProps from "./createProps"
import { Link } from 'react-router-dom';
import { createVotesComp, createVComp, updateCompAction} from "../../../actions/compActions";
import {getUserAction} from "../../../actions/usersActions"
import NavBar from "../../general/navBar";
const Votes = (props) => {


  const [details, setDetails] = useState("");
  const [date] = useState("");
  const [target] = useState("");
  const [img, setImg] = useState(false);
  const [upload, setUpload] = useState()
  const [typeProps] = useState([]);
  const [itemImg, setItemImg]= useState(null)
  const [itemsImg, setItemsImg]= useState(new FormData())
  const [itemName, setItemName]= useState('')
  const [itemDetails, setItemDetails]= useState('')
  const [save, setSave]= useState('')
  const [form, setForm]= useState(new FormData())


  useEffect(()=>{
    if(props.location.compProps!==undefined){
      localStorage.setItem("usersList", props.location.compProps.userList)
    }
  if( props.user.userName===null){
    props.getUserAction(JSON.parse(localStorage.getItem("user"))._id)
  }
  },[props])


  const comp = {
    compName: localStorage.getItem("compName"),
    adminId: props.user._id,
    compType: localStorage.getItem("type"),
    usersList: localStorage.getItem("usersList"),
    details: details,
    target: target,
    targetDate: date,
    typeProps: typeProps
  }

  useEffect(()=>{
    if(props.comp._id===undefined){
      form.append("compName", comp.compName) 
      form.append("adminId", JSON.parse(localStorage.getItem("user"))._id)
      form.append("compType", comp.compType)
      form.append("details", comp.details)
      form.append("target", comp.target)
      form.append("targetDate", comp.targetDate)
      form.append("usersList", comp.usersList)
      form.append("typeProps", JSON.stringify(comp.typeProps))
      props.createVComp(form);
      setForm(new FormData())
    }
    // eslint-disable-next-line
  },[])



  useEffect(() => {
    const addImage=()=>{
      itemsImg.append("myFile", itemImg)
    }
    if (img) {
        setUpload(<div className="upload-image">
        <div  className="upload-image-div">
          <input type="file" name="myfiles" className="upload-image-input"  
          onChange={(e)=>{setItemImg(e.target.files[0])}} />
          <button className="upload-image-button" onClick={()=>{addImage(); setUpload(null)}} >
          סיום
          </button>
        </div>
      </div>);
    }
    else
        setUpload(null);
}, [img, itemsImg, itemImg])

  const onform=()=> {
    itemsImg.append("compId", props.comp._id)
    itemsImg.append("itemName", `${itemName}`)
    itemsImg.append("itemDetails", `${itemDetails}`)
    props.createVotesComp(itemsImg)
    setItemsImg(new FormData())

  }

  const onchange = (data) => {
    setDetails(data)
  }

  // function addQ(){
  //   const qe = { itemName: itemName, itemDetails: itemDetails, itemImg: itemImg.name};
  //   setTypeProps([...typeProps, qe]);
  // }
  function changeQ(){
    typeProps.forEach(i => {
      if (i.itemName===save){
        i.itemName=itemName;
        i.itemDetails=itemDetails;
        i.itemImg=itemImg;
        return
      } 
    });
  };

  function removeItem(name){
    typeProps.forEach(i => {
      if (i.itemName===name){
        typeProps.removeItem(i)
        return
      } 
    });

  }
  
  const listQ= typeProps.map(p => {
    return (
        <div className="competitions-list-qes">
          <div  className="votes-div">
      <img className="votes-list-img" src="" alt="img"></img>
      <div className="votes-list-name">{p.itemName}</div></div>
      <button onClick={()=>{changeQ(); setSave(p.itemName); setItemName(p.itemName); setItemDetails(p.itemDetails); }} 
      className="votes-list-button" > עריכה </button>
       <button className="votes-list-button" onClick={()=>{removeItem(p.itemName)}}>הסרה</button>
        </div>
    )
})
const onImg=(data)=>{
  setForm(data)
}

  function updateFunc() {
    form.append("compName", comp.compName) 
    form.append("adminId", comp.adminId)
    form.append("compType", comp.compType)
    form.append("details", comp.details)
    form.append("target", comp.target)
    form.append("targetDate", comp.targetDate)
    form.append("usersList", comp.usersList)
    form.append("typeProps", JSON.stringify(comp.typeProps))
    const id= props.comp._id
    props.updateCompAction(form, id).then(()=>{
      setForm(new FormData())

    });
    
  }

  return (
    <div className="competitions-style">
      <NavBar className="competitions-nav"></NavBar>
      <div className="competitions-details">
        <div className="comp-father-div">
          <h1 className="comp-header-secondpage">{localStorage.getItem("compName")}</h1>
          <div> <Link to={`/create/${props.user._id}`}>  <button className="props-button">חזור</button></Link></div>
          <div className="competitions-list">
        <div className="competitions-list-header">פריטים קיימים להצבעה</div>
  <div className="competitions-list-qes">{listQ}</div>

      </div>
          <CreateProps onchange={(e) => { onchange(e) }} onImg={(e)=>{ onImg(e)}}></CreateProps>
          {/* <ImageUpload ontake={(e) => { onchange(e) }}></ImageUpload> */}
          <div className="comp-center-button">
            <div className="comp-label-target">הוספת פריט להצבעה</div>
            
            <div className="votes-add-div">
            <div className="votes-div">
            <button className="votes-add-img" onClick={() => { !img ? setImg(true) : setImg(false) }} >העלה תמונת מוצר</button> 
            <div className="votes-input-div">
              <input className="votes-input" placeholder="שם מוצר" value={itemName} onChange={event => setItemName(event.target.value)}></input>
              <input className="votes-input"  placeholder="פירוט" value={itemDetails} onChange={event => setItemDetails(event.target.value)}></input>
            </div></div>
            <button className="votes-button" onClick={()=>{ setItemDetails(""); setItemImg('');setItemName(''); onform()}}>הוספה</button>
            </div>
             <div className="comp-uploud">{upload}</div>
          </div>
          <div className="comp-center-button">
          <button className="comp-continue-button" onClick={() => { updateFunc() }}>התחל תחרות</button>
        </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {

  return {
    user: state.user.userActive,
    comp: state.comp.competitionActive,
    error: state.user.loginError
  }
}

export default connect(mapStateToProps, {updateCompAction,getUserAction, createVotesComp, createVComp })(Votes);