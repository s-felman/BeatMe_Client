import React from "react";
import NavBar from "../navBar/navBar";
import SlideShow from "../slideShow/slideShow";
import ShowList from "../displayList/showList";
import FooterPage from "../footer/footer.js"

const HomePage = () => {
    return (
        <div>
<div>
       <NavBar></NavBar>
</div> 
<div>
    <SlideShow></SlideShow>
</div>
<div>
    <ShowList></ShowList>
</div>
    <FooterPage></FooterPage>
   </div>    
   
)}

export default HomePage