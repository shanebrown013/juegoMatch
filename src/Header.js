import React from "react";
import "./Header.css";
import PersonIcon from '@material-ui/icons/Person';
import { AppBar } from "@material-ui/core";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {Link, useHistory} from "react-router-dom";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";

function Header( {backButton} ) {
    const history = useHistory();
    return(
        

        <Box  className="box">
            <AppBar position="static" className="AP">
                <Toolbar className="tb">

                    <Button 
                    className="header__icon" 
                    variant = "outlined" 
                    component = {Link} to = "/login"
                    >
                        Sign Out
                    </Button>
                    
                    <Link to = "/swipepagemain">
                        <img 
                        className ="header__logo" 
                        src = {process.env.PUBLIC_URL + '/Logo_juego.png'} 
                        alt = "logo" 
                        />
                    </Link>

                    <Button 
                    className="header__icon" 
                    variant = "outlined" 
                    endIcon={<PersonIcon/>} 
                    component = {Link} to = "/profile"
                    >
                        Profile
                    </Button>

                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header