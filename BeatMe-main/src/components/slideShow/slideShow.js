import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Faker from "faker";
import "react-responsive-carousel/lib/styles/carousel.min.css";
//import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-bootstrap/Carousel';
import namer from "./namer.jpg";
import bridge from "./bridge.jpg";
import home from "./home.jpg"

const SlideShow = () => {

        const [index, setIndex] = useState(0);

        const handleSelect = (selectedIndex, e) => {
            setIndex(selectedIndex);
        };

        return (
            <div>
               
                <Carousel fade activeIndex={index} onSelect={handleSelect} nextLabel={"הקודם"} prevLabel={"הבא"} >
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src={namer}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src={home}
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item >
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src={bridge}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                {/* <div id="slide" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carousel1" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
   <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={Faker.image.city()} className="d-block mw-100 mh-100 p-3" alt="1"/>
      <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
      </div>
    
    <div className="carousel-item">
      <img src={Faker.image.city()} className="d-block w-auto" alt="2"/>
      <div className="carousel-caption d-none d-md-block" >
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    
   
    <div className="carousel-item">
      <img src={Faker.image.city()} className="d-block w-auto" alt="3"/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carousel1" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">הקודם</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carousel1" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">הבא</span>
  </button>
  </div>
   */}
            </div>
        )

    }
    
    export default SlideShow