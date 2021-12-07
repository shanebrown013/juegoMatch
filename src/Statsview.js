// import React from "react";
import React, { useState, useEffect, useMemo, useRef } from "react";
import "./Statsview.css";

import {database} from "./firebase";

import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from "@material-ui/icons/Forum";
import IconButton  from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {Link, useHistory, useParams} from "react-router-dom";
import { People } from "@material-ui/icons";

console.log('starting script');


var O_mostPlayed;
var O_winRatio;
var O_compED;
var O_avgE;

var A_compRank;
var A_arenaRank;
var A_level;
var A_kills;

var C_wins;
var C_losses;
var C_winRate;


function Statsview( {backButton} ) {
    // getting api info from our db
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const chessName = urlParams.get('chess');

    const [game1, setgame1] = useState("");
    const [game2, setgame2] = useState("");
    const [game3, setgame3] = useState("");

    const [O_name, setO_name] = useState("");
    const [O_platform, setO_platform] = useState("");
    const [O_region, setO_region] = useState("");
    const [A_name, setA_name] = useState("");
    const [A_platform, setA_platform] = useState("");
    const [C_name, setC_name] = useState("");

    const [didO, setset_didO] = useState(false);
    const [didA, setset_didA] = useState(false);
    const [didC, setset_didC] = useState(false);

    
    useEffect(() => {
        database.collection('USERS').where('name','==',name).get().then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data()
                setgame1(data.game1);
                setgame2(data.game2);
                setgame3(data.game3);
                setO_name(data.overwatch);
                setO_platform(data.overwatchPlatform);
                setO_region(data.overwatchRegion);
                setA_name(data.apexLegends);
                setA_platform(data.apexLegendsPlatform);
                setC_name(data.chess);
            })
        }).catch(error => console.log(error))      
    },[]);

    if (O_name.localeCompare("none") == 0) {
        document.getElementById("overwatchDisplay").style.visibility = "hidden";
    }
    if (A_name.localeCompare("none") == 0) {
        document.getElementById("apexDisplay").style.visibility = "hidden";
    }
    // if (chessName.localeCompare("none") == 0) {
    //     document.getElementById("chessDisplay").style.visibility = "hidden";
    // }
    var O_url = 'https://owapi.io/stats/' + O_platform + '/' + O_region + '/' + O_name;
    var A_url = 'https://api.mozambiquehe.re/bridge?version=5&platform=' + A_platform + '&player=' + A_name + '&auth=7ThP0bUtZjYnDtJYz4uf';
    var C_url = 'https://api.chess.com/pub/player/' + C_name + '/stats';
    // var C_url = 'https://api.chess.com/pub/player/cnewby5283/stats';
    console.log(C_url);

    // console.log(O_url)
    var request_O = new XMLHttpRequest();
    var request_A = new XMLHttpRequest();
    var request_C = new XMLHttpRequest();
    // API queries
    request_O.open('GET', O_url, true);
    request_A.open('GET', A_url, true);
    request_C.open('GET', C_url, true);
    // potential API queries
    // request.open('GET', 'https://api.clashroyale.com/v1/players/%239CCUURQVJ', true);
    // request.setRequestHeader("authorization","Bearer [api key for specific IP]");
    console.log('got queries');

    if (O_name.localeCompare("") != 0 && O_platform.localeCompare("") != 0 && O_region.localeCompare("") != 0) {
        console.log("O_url: ", O_url)
        request_O.onload = function () {
            var data = JSON.parse(this.response);
            var data = JSON.parse(this.response);
            if (request_O.status >= 200 && request_O.status < 400) {
                if (data.stats.top_heroes.competitive.played.length > 0) {
                    O_mostPlayed = "Most Played: " +  data.stats.top_heroes.competitive.played[0].hero + ", " + data.stats.top_heroes.competitive.played[1].hero + ", " + data.stats.top_heroes.competitive.played[2].hero;
                }
                else {
                    O_mostPlayed = 'This player has not played this season! <br/> Stats for overwatch are only displayed for the current season!';
                }
                if (data.stats.game.competitive.length > 0) {
                    O_winRatio = "Win Ratio: " +  (parseInt(data.stats.game.competitive[3].value) / parseInt(data.stats.game.competitive[1].value)).toFixed(3);
                } else {
                    O_winRatio = "";
                }
                if (data.stats.combat.competitive.length > 0) {
                    O_compED = "Competitive Elims/Deaths: " +  (parseInt(data.stats.combat.competitive[4].value) / parseInt(data.stats.combat.competitive[3].value)).toFixed(3);
                } else {
                    O_compED = "";
                }
                if (data.stats.average.competitive.length > 0) {
                    O_avgE = "Avg. Eims / 10 Minutes: " +  data.stats.average.competitive[3].value;
                } else{
                    O_avgE = "";
                }
                document.getElementById("O_1").innerHTML = O_mostPlayed;
                document.getElementById("O_2").innerHTML = O_winRatio;
                document.getElementById("O_3").innerHTML = O_compED;
                document.getElementById("O_4").innerHTML = O_avgE;
            } else {
                return (
                    <marquee>
                        API Request Failed
                    </marquee>
                )
            }
            // didO = true;
        }

        request_O.send();
    }
    if (A_name.localeCompare("") != 0 && A_platform.localeCompare("") != 0) {
        console.log("A_url: ", A_url)
        request_A.onload = function () {
            var data = JSON.parse(this.response);
            var data = JSON.parse(this.response);
            if (request_A.status >= 200 && request_A.status < 400) {
                A_compRank = "Competitive Rank : " + data.global.rank.rankName + " -- " + data.global.rank.rankScore;
                A_arenaRank = "Arena Rank : " + data.global.arena.rankName + " -- " + data.global.arena.rankScore;
                A_level = "Level : " + data.global.level;
                A_kills = "Kills : " + data.total.kills.value;
                document.getElementById("A_1").innerHTML = A_compRank;
                document.getElementById("A_2").innerHTML = A_arenaRank;
                document.getElementById("A_3").innerHTML = A_level;
                document.getElementById("A_4").innerHTML = A_kills;
                
            } else {
                return (
                    <marquee>
                        API Request Failed
                    </marquee>
                )
            }
            // didA = true;
        }
        request_A.send();
    }
    if (C_name.localeCompare("") != 0) {
        console.log("C_url: ", C_url)
        request_C.onload = function () {
            // console.log("test chess query below 1");
            var data = JSON.parse(this.response);
            if (request_C.status >= 200 && request_C.status < 400) {
                C_wins = "Wins : " + data.chess_blitz.record.win;
                C_losses = "Losses : " + data.chess_blitz.record.loss;
                C_winRate = "Win rate (Win/Loss): " + (parseInt(data.chess_blitz.record.win) / parseInt(data.chess_blitz.record.loss)).toFixed(3);
                document.getElementById("C_1").innerHTML = C_wins;
                document.getElementById("C_2").innerHTML = C_losses;
                document.getElementById("C_3").innerHTML = C_winRate;
                
            } else {
                return (
                    <marquee>
                        API Request Failed
                    </marquee>
                )
            }
            // didC = true;
        }
        
        request_C.send();
    }

    return(
        <div className="wrapper">
            
            <div class="apiDisplays">
                
            <div id="nameDisplay">
                <br/>Meet {name}!<br/><br/>
            </div>
            <div id="gamesPlayedDisplay">
                {/* show games */}
                {name} plays these games: <br/>
                {game1} <br/> {game2} <br/> {game3}
                <br/><br/>
            </div>
            <div id="apiDisplay">
                {/* shows api data */}
                Avaliable stats for {name} <br/><br/>
            </div>
            <div id = "overwatchDisplay">
                <h1 className="header1">Overwatch Stats: {O_name}</h1>
                <p id="O_1">None</p>
                <p id="O_2">None</p>
                <p id="O_3">None</p>
                <p id="O_4">None</p> 
            </div>
            <div id = "apexDisplay">
                <h1 className="header1">Apex Stats: {A_name}</h1>
                <p id="A_1">None</p>
                <p id="A_2">None</p>
                <p id="A_3">None</p>
                <p id="A_4">None</p>
            </div>
            <div id = "chessDisplay">
                <h1 className="header1">Chess.com Stats: {C_name}</h1>
                <p id="C_1">None</p>
                <p id="C_2">None</p>
                <p id="C_3">None</p>
            </div>
        </div>
        </div>
        
    )
}

export default Statsview
