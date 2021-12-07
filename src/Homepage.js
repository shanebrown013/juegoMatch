import React from "react";
import './Homepage.css';
import { Button } from "@material-ui/core";
import {Link} from "react-router-dom";
function Homepage() {
    return(
        <div className = "Homepage__text" >
            <div>
                <h1 className = "text__subheadings">Juego</h1>
                <br></br>
                <div className="aboutText">
                    <h4>Juego is an online platform that allows user to easily and safely find new people to game with on the most popular games.</h4>
                </div>
                
                <div>
                <div className="containerHomepage">

                     <div className="projInfo">   
                     <h4>&#128202; View potential teammate's gaming stats and connect with
                         just a simple swipe to the right!
                     </h4>
                    </div>

                    <div className="projInfo">
                    <h4>&#127918; Find the perfect teammates to play with! No more matching with random 
                        toxic players
                    </h4>
                    </div>

                    <div className="projInfo">
                    <h4>&#127942; The platforms intuitive UI allows users to quickly and easily filter out other users based on metrics like skill, game preference, and gaming platform.</h4>
                    </div>

                    <div className="projInfo">
                    <h4>&#128377; Juego features support for multiple games and their stats (More to come soon!)</h4>
                    </div>

                </div>
                </div>

                <div className="projInfo">
                    <h4>Sign up with Google!</h4>
                </div>

                <h1 className = "text__subheadings2">Sign Up for FREE today and Start having a real gaming experience!</h1>
            </div>


            <div className = "signup">    
                <Button className = "lbutton" variant="outlined" size= "large" component = {Link} to = "/login">
                    Sign Up
                </Button>
            </div>
        </div>
    )
}

export default Homepage;