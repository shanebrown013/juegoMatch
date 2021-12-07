import React from "react";
import './Supported_apis.css';
import { Button } from "@material-ui/core";



function Supported_apis() {
    return(
        <div className = "API__pagetext" >
            <div>
                <div className = "heading__divs" >
                    <h1 className= "pagetext__headings" >Overwatch</h1>
                    <Button className = "api__buttons" variant="contained" size= "medium" href = "https://owapi.io/docs/">
                        Overwatch Documentation
                    </Button>
                </div>

                <div className = "heading__divs" >
                    <h1 className= "pagetext__headings" >Apex Legends</h1>
                    <Button className = "api__buttons" variant="contained" size= "medium" href = "https://apexlegendsapi.com/documentation.php">
                        Apex Legends Documentation
                    </Button>
                </div>

                <div className = "heading__divs" >
                    <h1 className= "pagetext__headings" >Chess.com</h1>
                    <Button className = "api__buttons" variant="contained" size= "medium" href = "https://www.chess.com/news/view/published-data-api">
                        Chess.com Documatation
                    </Button>
                </div>

                <h1 className= "pagetext__text" >All of the APIs listed above return public 
                information related to game data including 
                game statistics, usernames, and other data. 
                Some of these APIs are unofficial and where created by the community which presents several issues. 
                The main issue has to do with the long-term support for these endpoints but 
                for the purposes of this project, 
                these APIs fulfill our needs.</h1>


            </div>
        </div>
    )
}

export default Supported_apis;