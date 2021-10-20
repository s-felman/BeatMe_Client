import React, {useState ,useEffect } from 'react';
import Box from '@material-ui/core/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import "./flexBox.css";
import cake from "../../static/images/cake.png"
import cycle from "../../static/images/cycling.png"
import lab from "../../static/images/laboratory.png"
import macaroons from "../../static/images/macaroons.png"
import notebook from "../../static/images/notebook.png"
import {getAllCompAction} from "../../actions/compActions";
import { connect } from "react-redux";
const FlexWrap=(props)=> {
  // eslint-disable-next-line
  const list = [
    { image: [cycle], header: "אימון כושר", details: "הספק יומי של רכיבה" },
    { image: [cake], header: "הגשה קולינרית", details: "?מי העוגה המנצחת" },
    { image: [lab], header: "אתגרים במדע", details: "חידון מדעי ברמה גבוהה" },
    { image: [macaroons], header: "צבע וטעם", details: "יצירת בר משותף בעבודת צוות מרחוק" },
    { image: [notebook], header: "כתיבת מאמר", details: "כתיבת מאמרים עד לתאריך 03.08" },]

    useEffect(()=>{
     props.getAllCompAction()
    },[Box]);
//note that 
  const mymap = props.competitions
    .map(p =>{
      return (
        <div p={1}>
          <Card style={{ width: '18rem' }} className="box">
            <Card.Img variant="top" src={"http://localhost:3000/" + p.image } />
            <Card.Body>
              <Card.Title className="title">{p.compName}</Card.Title>
              <Card.Text className="details1">
                {p.details}
              </Card.Text>
              <button variant="primary" className="enter">כניסה</button>
            </Card.Body>
          </Card>
        </div>
      );

    })

  return (
    <div>
      <Box
        //   justifyContent="center"
        display="flex"
        flexWrap="wrap"
        p={1}
        m={1}>
        {mymap}
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      competitions: state.comp.competitions
  }
}
export default connect(mapStateToProps,{getAllCompAction})(FlexWrap);

//https://material-ui.com/system/flexbox/#flex-shrink
//https://react-bootstrap.github.io/components/cards/


