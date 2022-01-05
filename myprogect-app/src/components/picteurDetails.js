import React from "react";

const PictureDetails = (props) => {
    const {image, pictureName, pictureDescription} = props;
    return (
    <div className="picture-container">
    <img alt='image' src={image}/>
    <div className="picture-content">
      <div className='picture-name'>{pictureName}</div>
      <div className='picture-description'>{pictureDescription}</div>
    </div>
  </div>
  );
};

export default PictureDetails;