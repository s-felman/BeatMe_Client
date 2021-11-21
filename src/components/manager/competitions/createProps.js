import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./competitions.css";
import NavBar from "../../general/navBar";
import ImageUploader from 'react-images-upload';
import ImageUpload from "../../general/imageUploud";
import ImageDB from './image';
const CreateProps = (props) => {


    const [img, setImg] = useState(false);
    const [upload, setUpload] = useState()
    const [data, setData] = useState("");

    const handleChange = event => {
        props.onchange(event.target.value);
    }
    const onchange = (data) => {
        console.log(data)
        setData(data)
    }

    useEffect(() => {
        if (img) {
            setUpload(<ImageUpload ontake={(e) => { onchange(e) }}></ImageUpload>);
            window.addEventListener("scroll", noscroll);
            window.removeEventListener("scroll", noscroll);
        }
        else
            setUpload(null);
    }, [img])

    const noscroll = () => {
        window.scrollTo(0, 0);
    }

    const popup = () => {
        window.addEventListener("scroll", noscroll);
        window.removeEventListener("scroll", noscroll);
    }
    return (
        <div>
            
            <div className="comp-props">
                <textarea className="comp-input-more-details" onChange={handleChange} placeholder="...קצת פרטים"></textarea><br />
                <button className="comp-input-more-details" onClick={popup} onClick={() => { !img ? setImg(true) : setImg(false) }} >העלאת תמונה</button><br />
              </div>  
              <div className="comp-uploud">{upload}</div>
            
            </div>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user.userActive,
        comp: state.comp.comp
    }
}

export default connect(mapStateToProps)(CreateProps);
