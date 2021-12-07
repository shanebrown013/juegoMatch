import React from "react";
import "./Home_header.css";

import {Link} from "react-router-dom";
import { Button } from "@material-ui/core";

import { AppBar } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";


function Home_header() {
    return(
        

        <Box  className="box">
            <AppBar position="static" className="AP">
                <Toolbar className="tb">

                    <Button className = "lbutton" variant="outlined"  component = {Link} to = "/supportedapis">
                        APIs Used
                    </Button>

                    <Link to = "/">
                        <img className ="header__logo" src = {process.env.PUBLIC_URL + '/Logo_juego.png'} alt = "logo" />
                    </Link>

                    <Button className = "lbutton" variant="outlined"  component = {Link} to = "/login">
                        Log In
                    </Button>

                </Toolbar>
            </AppBar>
        </Box>
        
    );
}

export default Home_header;