import React, { useState, useEffect, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import {database, UUID} from "./firebase";
import './TinderCards.css';
import "./SwipeButtons.css";

import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import IconButton  from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";

function TinderCards() {
    
    useEffect(() => {
        const unsubscribe = database
        .collection('USERS')
        .onSnapshot(snapshot => ( setPeople(    snapshot.docs.map(doc => doc.data())  )        ) )
        

        return () =>{
            //cleanup function
            unsubscribe();
        };

    },[]);

    const [people, setPeople] = useState([]); 

    //
    const [currentIndex, setCurrentIndex] = useState(people.length - 1) // THIS SHOULD BE UPDATE CURRENT INDEX
    const [lastDirection, setLastDirection] = useState()
    const currentIndexRef = useRef(currentIndex)
    const currentPersonParam = "/userstats?";

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const childRefs = useMemo(
        () =>
          Array(people.length)
            .fill(0)
            .map((i) => React.createRef()),
        [currentIndex]
      )
    
    const canGoBack = currentIndex < people.length - 1

    const canSwipe = currentIndex >= 0

    var allMatches = [];

    const pushMatches = (allMatches) => {
        database.collection('USERS').doc(UUID).update({"matches": allMatches}).then().catch((error) => {
        console.log("error1")
      });
    }


    const match =(direction, index) => {
        console.log("onematch: ", people.at(index).name)
        var word = people.at(index).name + ", "
        allMatches.push(word)
        console.log("Pushed into array", allMatches)
        pushMatches(allMatches)
    }


    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)
        const directionNew = direction;
        console.log("directionNew", directionNew)
        if(directionNew == 'right') {
            match(direction, index)
        }
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name, idx) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }

    const swipe = async (dir) => {
        console.log("swipe attempted")
        if (canSwipe && currentIndex < people.length) {
            console.log("swipe entered")
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
            console.log("swipe completed")
        }
    }
    

    // the [] are dependencies on this function - if its blank it only runs once

    // 1:57:25
    // console.log(people[0].name);
    return(
        <div>
            <div className="tinderCards__cardContainer" >
                {people.map((person,index) => (
                    <TinderCard 
                        className = "swipe" 
                        key={person.name} 
                        preventSwipe={['up','down']} 
                        ref={childRefs[index]}
                        onSwipe={(dir) => swiped(dir, person.name, index)}
                        onCardLeftScreen={() => outOfFrame(person.name, index)}
                    >
                        <div className="card" style={{ backgroundImage: `url(${person.url})` }} >
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className='swipeButtons'>
                {/* <IconButton className="swipeButtons__left" onClick={() => swipe('left')}>
                    <CloseIcon fontSize = "large" />
                </IconButton> */}
                <IconButton className="swipeButtons__control" component = {Link} to = {people.length > 0 && `/userstats/?name=${people.at(currentIndex).name}`}>
                    <SportsEsportsIcon fontSize = "large" />
                </IconButton>
                {/* <IconButton className="swipeButtons__right" onClick={() => swipe('right')}>
                    <FavoriteIcon fontSize = "large" />
                </IconButton> */}
            </div>
            {/* <h4>Stats page: <Link to = {people.length > 0 && `/userstats/?name=${people.at(currentIndex).name}&chess=${people.at(currentIndex).chess}`}>{people.length > 0 && people.at(currentIndex).name}</Link></h4> */}
            {/* {lastDirection ? (
                <h2 key={lastDirection} className='infoText'>
                You swiped {lastDirection}, <br/>
                now swipe on: <br/>
                 {people.at(currentIndex).name} <br/>
                 currentIndex = {currentIndex}
                </h2>
            ) : (
                <h2 className='infoText'>
                Swipe or Click <br/>
                on {currentIndex}
                </h2>
            )} */}
        </div> 
    )
}

export default TinderCards

// useState -  
//  - can only be used inside of components 
//  - returns an array of values 
//  - const [value, setValue] --- first element is the state , 
//                                 second element is the function that updates the state

// useEffect - 
//  - runs when a value changes , for example in a useState hook
//  - this is called a side effect 
//  - takes in a function
//  - this function runs everytime the page renders 
//  - the '[]' at the end is a conditional, meaning tht the function only runs when 
//    the variable inside it has changed.