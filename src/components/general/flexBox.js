import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import "./flexBox.css";
import { getAllCompAction } from "../../actions/compActions";
import { connect } from "react-redux";
import { getUserAction, registerToCompAction } from "../../actions/usersActions"
import ShowMoreText from 'react-show-more-text';

const FlexWrap = (props) => {

  useEffect(() => {
    props.getAllCompAction()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {

    if (props.isLogged === true && props.user.userName === null) {
      var u = JSON.parse(localStorage.getItem('user'));
      props.getUserAction(u._id)
    }
  }, [props])

  const compEnter = (p) => {
    var register=false;
    if (props.user.competitionsList != null) {
      props.user.competitionsList.forEach(element => {
        debugger
        if (element === p._id) {
          register=true;
          window.location.replace(`participant${p.compType}/${p._id}`)
          return
        }
          
      })
      if(!register)
        props.registerToCompAction(props.user._id, p._id); 
    }
    
  }

  var list = props.competitions.length !== 0 ? props.competitions.slice(0,5) : []
  const mymap = list
    .map(p => {
      return (
        <div p={1}>
          <Card style={{ width: '18rem' }} className="box">
            <Card.Img className="flex-box-img" variant="top" src={"http://localhost:3000/" + p.image} />
            <Card.Body>
            <ShowMoreText 
                    /* Default options */
                    lines={2}
                    more=""
                    less="Show less"
                    className="title"
                    //  anchorClass={styles.name}
                    expanded={false}
                    // expandByClick={()=>true}
                    width={0}
                    truncatedEndingComponent={'... '}
                  >{p.compName}
                  </ShowMoreText>
              <Card.Text className="details1">
                {p.details}
              </Card.Text>
              <button variant="primary" className="enter" onClick={() => compEnter(p)}>כניסה</button>
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
    competitions: state.comp.competitions,
    user: state.user.userActive,
  }
}
export default connect(mapStateToProps, { getAllCompAction, getUserAction, registerToCompAction })(FlexWrap);

//https://material-ui.com/system/flexbox/#flex-shrink
//https://react-bootstrap.github.io/components/cards/


