import React from "react";
import { Divider,Box } from "@material-ui/core";
import {Link} from "react-router-dom";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import "./Profilepage.css";
import { database, UUID, uservar} from "./firebase";

class Profilepage extends React.Component {
    
    
    state = {
        profile_test11: null
    }

    componentDidMount() {
        console.log('mounted')
        database.collection('USERS').where('__name__', '==' , UUID).get().then(snapshot => {
            const profile_test11 = []
            snapshot.forEach(doc => {
                const data = doc.data()
                profile_test11.push(data)
            })
            this.setState({ profile_test11: profile_test11 })
            //console.log(snapshot)
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="ViewProfile">
                <Box className="heading">

                <IconButton className = "button__edit" component = {Link} to = "/swipepagemain">
                    <ArrowBackIos fontSize = "large" />
                </IconButton>

                <h1>Profile</h1>

                <Button className = "button__edit" variant="outlined" size="large" component = {Link} to = "/editprofile">
                        Edit profile
                </Button>

                </Box>
                <Divider className="divider" variant= "middle"/>

                <Box className="container">
                <img src={uservar} id="profileImage" className="profileIMG"/>
                <div className="break"></div>
                </Box>
        
                {
                    this.state.profile_test11 &&
                    this.state.profile_test11.map( profile => {
                        return(
                            <div>
                                <div className="profileInfo">
                                <p><b>Name</b>: {profile.name}</p>
                                <p><b>Bio</b>: {profile.bio}</p>
                                <p><b>Game1</b>: {profile.game1}</p>
                                <p><b>Game2</b>: {profile.game2}</p>
                                <p><b>Game3</b>: {profile.game3}</p>
                                <p><b>Overwatch</b>: {profile.overwatch}</p>
                                <p><b>Chess</b>: {profile.chess}</p>
                                <p><b>ApexLegends</b>: {profile.apexLegends}</p>
                                <p><b>Matches</b>: {profile.matches}</p>
                                <p><br/>To check out one of your matches, enter this link in your browser (In new tab): </p>
                                <p> http://csce315juego.firebaseapp.com/userstats/?name=[first]%20[last] </p>
                                <div class="break"></div>
                                </div>
                            </div>
                            
                        )
                    })
                }
                
            </div>
        )
    }
}

export default Profilepage;