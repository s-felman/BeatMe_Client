import React, { useEffect, useState } from "react";
import "./selectDate.css";
import Calendar from "react-calendar";
import Moment from 'moment';
const SelectDate = () => {

    const [ setDate] = useState("");
    const [value, setValue] = useState(new Date());
    const [dateDiv, setDateDiv] = useState(true)
    const [data, setData] = useState();

    useEffect(() => {
        setValue(value);
        console.log("ddd", value)
    },[value])

    useEffect(() => {
        if (dateDiv) {
            setData(<Calendar  className="comp-calander" onChange={onChange} value={value} calendarType="Hebrew" ></Calendar>);
        }
        else
            setData(null);
    }, [dateDiv, setData, value])

    function onChange(nextValue) {
        console.log("naet", nextValue)
        setValue(nextValue);
    }
    return (
        <div className="select-date">
            <div className="competitions-target-details-date" placeholder="תאריך" onChange={event => setDate(event.target.value)}> {Moment(value).format('DD-MM-yyyy')}   
            <button className="search-icon" onClick={() => { !dateDiv ? setDateDiv(true) : setDateDiv(true) }}></button>
            </div>
          
            <div>{data}</div> 
        </div>
    )
}


export default SelectDate
