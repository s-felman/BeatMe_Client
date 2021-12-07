//  import React,{useEffect, useState} from "react";
// import { RMIUploader } from "@dieyne/react-images-uploader";
//  import RUG from 'react-upload-gallery'
 
// // Add style manually
// //import 'react-upload-gallery/dist/style.css' 
// const dataSources = [
//   {
//     id: 1,
//     dataURL: "https://picsum.photos/seed/1/600",
//   },
//   {
//     id: 2,
//     dataURL: "https://picsum.photos/seed/2/600",
//   },
//   {
//     id: 3,
//     dataURL: "https://picsum.photos/seed/3/600",
//   },
//   {
//     id: 4,
//     dataURL: "https://picsum.photos/seed/4/600",
//   },
//   {
//     id: 5,
//     dataURL: "https://picsum.photos/seed/5/600",
//   },
//   {
//     id: 6,
//     dataURL: "https://picsum.photos/seed/6/600",
//   },
//   {
//     id: 7,
//     dataURL: "https://picsum.photos/seed/7/600",
//   },
//   {
//     id: 8,
//     dataURL: "https://picsum.photos/seed/8/600",
//   },
//   {
//     id: 9,
//     dataURL: "https://picsum.photos/seed/9/600",
//   },
//   {
//     id: 10,
//     dataURL: "https://picsum.photos/seed/10/600",
//   },
// ];

// const ImageUpload=(props)=>{
//  // or scss
 
// <RUG
//   action="/api/upload" // upload route
//   source={response => response.source} // response image source
// />
// // const [visible, setVisible] = useState(false);
// //   const handleSetVisible = () => {
// //     setVisible(true);
// //   };
// //   const hideModal = () => {
// //     setVisible(false);
// //   };
// //   const onUpload = (data) => {
// //     console.log("Upload files", data);
// //   };
// //   const onSelect = (data) => {
// //     console.log("Select files", data);
// //   };
// //   const onRemove = (id) => {
// //     console.log("Remove image id", id);
// //   };

// //   return (
// //     <div >
// //       <button onClick={handleSetVisible}>Show Me</button>
// //       <RMIUploader
// //         isOpen={visible}
// //         hideModal={hideModal}
// //         onSelect={onSelect}
// //         onUpload={onUpload}
// //         onRemove={onRemove}
// //         dataSources={dataSources}
// //       />
// //     </div>
// //   );
// }

// export default ImageUpload;

import { Button } from 'bootstrap';
import React from 'react';
import ImageUploader from 'react-images-upload';
import "../manager/competitions/competitions.css";
class ImageUpload extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(pictures) {
        this.setState({
            pictures
            
        });
        
    }
   

    render() { 
        console.log(this.state.pictures)
        return (
            <div>
            <ImageUploader
                withIcon={false}
                withPreview={false}
                label=""
                buttonText='בחירת תמונה'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview={true}>
             </ImageUploader>
            </div>
        );
    }
}
export default ImageUpload;
//https://www.npmjs.com/package/react-images-upload/v/1.2.7