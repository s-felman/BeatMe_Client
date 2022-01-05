import React from "react";
import logo from './logo.svg';
import Faker from "faker";
import PictureDetails from './components/picteurDetails';
import './App.css';

const App =() =>{
  return(
    <div>
      <PictureDetails pictureName="Nice Picture!!" pictureDescription="Nice!" image={Faker.image.city()}/>
      <PictureDetails pictureName="Good Picture!!" pictureDescription="Good!" image={Faker.image.city()}/>
      <PictureDetails pictureName="Very Nice Picture!!" pictureDescription="Very Nice!" image={Faker.image.city()}/>
    </div>
  );
}; 

export default App;
