import axios from 'axios';
import "./uploadImage.css"
import React,{Component} from 'react';

class UploadImage extends Component {

	state = {

	// Initially, no file is selected
	selectedFile: null
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
	
	// Update the state
	this.setState({ selectedFile: event.target.files[0] });
	
	};
	
	// On file upload (click the upload button)
	onFileUpload = () => {
	
	// Create an object of formData
	const formData = new FormData();
	
	// Update the formData object
	formData.append("myFile",this.state.selectedFile,);
	
	// Details of the uploaded file
	console.log(this.state.selectedFile);
	for (var p of formData) {
        console.log(p);
      }

    this.props.onform(formData)
	// Request made to the backend api
	// Send formData object
	// axios.post("http://localhost:3000/users/", formData);
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	
	if (this.state.selectedFile) {
		
		return (
		<div>
			<h2>File Details:</h2>
			
<p>File Name: {this.state.selectedFile.name}</p>

			
<p>File Type: {this.state.selectedFile.type}</p>

			
<p>
			Last Modified:{" "}
			{this.state.selectedFile.lastModifiedDate.toDateString()}
			</p>

		</div>
		);
	} else {
		return (
		<div>
			<br />
			<h4>Choose before Pressing the Upload button</h4>
		</div>
		);
	}
	};
	
	render() {
	
	return (
		<div className="upload-image">
			<div  className="upload-image-div">
				<input type="file" name="myfile" className="upload-image-input" onChange={this.onFileChange} />
				<button className="upload-image-button" onClick={this.onFileUpload}>
				סיום
				</button>
			</div>
		{/* {this.fileData()} */}
		</div>
	);
	}
}

export default UploadImage;
