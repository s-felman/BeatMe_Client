import React from "react";
import Faker from "faker";
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./showList.css"
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

const ShowList = (props) => {
   
const x=[{image: Faker.image.city(), header: "ddd", details: "asddf"},
         {image: Faker.image.fashion(), header: "ddd", details: "asddf"},
         {image: Faker.image.nature(), header: "ddd", details: "asddf"},
         {image: Faker.image.sports(), header: "ddd", details: "asddf"},
// {image: Faker.image.sports(), header: "ddd", details: "asddf"},
// {image: Faker.image.technics(), header: "dddצצ", details: "asddf"},
// {image: Faker.image.sports(), header: "dחdצצd", details: "asddf"},
// {image: Faker.image.city(), header: "ddd", details: "asddf"},
]

    const classes = useStyles();
    const mymap = x
    .map(p => {
        return (
     <div>       
      <Card className={classes.root} className="cards">
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={p.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {p.header}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {p.details}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card h-100">
      <img src={p.image} class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">{p.header}</h5>
        <p class="card-text">{p.details}</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
  </div>
  </div>
    );

        })
     
    

    return <div  className="cards" >{mymap}</div>

}
export default ShowList;