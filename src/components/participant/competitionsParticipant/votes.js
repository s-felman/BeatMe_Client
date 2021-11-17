import React, {useState, useEffect } from "react";
import CreateProps from "./createProps"
import addCompetitonAPI from "../../api/managerFunctions";

const Votes=(props)=>{
    

    const [details, setDetails]= useState("");
    const [date, setDate]=useState("");
    const [target, setTarget]= useState("");
    
      const comp={
        name: props.location.compProps.name,
        type:  props.location.compProps.type,
        userList:  props.location.compProps.userList,
        details: details,
        target: target,
        targetDate: date
      }
      useEffect(()=> {
        console.log("product props is", props.location.compProps);
        console.log("comp!", comp)
      })
    
      const onchange = (data) => {
        setDetails(data)
    }
        return()
    }
 

export default Votes