import React from "react";
import firebase from "firebase";
import { Button } from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import './Loginpage.css';


class Loginpage extends React.Component {

    render() {
        return (
        <div>
            <div className="buttons">
                    <img 
                    className ="logo" 
                    src = {process.env.PUBLIC_URL + '/Logo_juego.png'} 
                    alt = "logo" 
                    />
                <Button class="loginButton" onClick={this.signInWithGoogle}>Sign In!</Button> <br></br>
                <Button class="logoutButton" onClick={this.signOut}>Log Out!</Button>
            </div>
        </div>    
        );
    }

    signInWithGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("profile");
        provider.addScope("email");
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;       
                if(user != null)
                {
                    window.location = "/swipepagemain";
        
                }
            });
    }


    
    signOut() {
        firebase.auth().signOut();
        window.location = "/";
        console.log("signed out")
        var label = document.getElementById("profileIMG");
        if (label != null) {
            document.body.removeChild(label);
        }
    };


}



export default Loginpage;