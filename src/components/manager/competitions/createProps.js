import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./competitions.css";
// import ImageUpload from "../../general/imageUploud";
import UploadImage from "../../general/uploadImage";
const CreateProps = (props) => {


    const [img, setImg] = useState(false);
    const [upload, setUpload] = useState()


    const handleChange = event => {
        props.onchange(event.target.value);
    }


    useEffect(() => {
        const onform = (data) => {
            props.onImg(data)
            setUpload(null)
        }
        if (img) {
            setUpload(<UploadImage onform={(e) => { onform(e) }}></UploadImage>);
        }
        else
            setUpload(null);
    }, [props,img])


    return (
        <div>
            
            <div className="comp-props">
                <textarea className="comp-input-more-details" onChange={handleChange} placeholder="...קצת פרטים"></textarea><br />
                <button className="comp-input-more-details" onClick={() => { !img ? setImg(true) : setImg(false) }} >העלאת תמונה</button><br />
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
