import React, { useState } from "react";
import "./EditProfile.css";
import { database, UUID, uservar } from "./firebase";

import { Divider,Box } from "@material-ui/core";
import {Link} from "react-router-dom";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";

const EditProfile = () => {
  
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [game1, setGame1] = useState("");
  const [game2, setGame2] = useState("");
  const [game3, setGame3] = useState("");
  const [overwatch, setOverwatch] = useState("");
  const [overwatchPlatform, setOverwatchPlatform] = useState("");
  const [overwatchRegion, setOverwatchRegion] = useState("");
  const [chess, setChess] = useState("");
  const [apexLegends, setApexLegends] = useState("");
  const [apexLegendsPlatform, setApexLegendsPlatform] = useState("");
  const [loader, setLoader] = useState(false);


  

  console.log(UUID);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    database.collection('USERS').doc(UUID)
      .set({
        
        name: name,
        bio: bio,
        game1 : game1,
        game2 : game2,
        game3 : game3,
        overwatch: overwatch,
        overwatchPlatform: overwatchPlatform,
        overwatchRegion: overwatchRegion,
        chess: chess,
        apexLegends: apexLegends,
        apexLegendsPlatform: apexLegendsPlatform,
        url: uservar
      })
      .then(() => {
        setLoader(false);
        alert("Your profile has been updated👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    
    setName("");
    setBio("");
    setGame1("");
    setGame2("");
    setGame3("");
    setOverwatch("");
    setOverwatchPlatform("")
    setOverwatchRegion("")
    setChess("");
    setApexLegends("");
    setApexLegendsPlatform("")
  };

  return (

    <div>

    <Box className="heading">

    <IconButton className = "button__edit" component = {Link} to = "/swipepagemain">
        <ArrowBackIos fontSize = "large" />
    </IconButton>

    <h1>Edit Your Profile</h1>

    <Button className = "button__edit" variant="outlined" size="large" component = {Link} to = "/editprofile">
            Edit profile
    </Button>

    </Box>
    <Divider className="divider" variant= "middle"/>

    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    
    <form className="form" onSubmit={handleSubmit}>


      <label>Name</label>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Bio</label>
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>


    <p>Enter what games you play from selection: Apex Legends, Overwatch, Chess. Or enter None.</p>
    <b></b>
    <label>Game 1</label>
      <input
        placeholder="Game 1"
        value={game1}
        onChange={(e) => setGame1(e.target.value)}
      />

    <label>Game 2</label>
      <input
        placeholder="Game 2"
        value={game2}
        onChange={(e) => setGame2(e.target.value)}
      />

    <label>Game 3</label>
      <input
        placeholder="Game 3"
        value={game3}
        onChange={(e) => setGame3(e.target.value)}
      />

      <label>Enter your Overwatch gamertag (Example: name-####) or enter none</label>
      <input
        placeholder="Overwatch Gamertag"
        value={overwatch}
        onChange={(e) => setOverwatch(e.target.value)}
      />

      <label>Enter your Overwatch Platform from list (Case Sensitive): pc, xbl, psn, nintendo-switch. Or enter none</label>
      <input
        placeholder="Overwatch Platform"
        value={overwatchPlatform}
        onChange={(e) => setOverwatchPlatform(e.target.value)}
      />

      <label>Enter your Overwatch Region from list (Case Sensitive): us, eu, kr, cn, global. Or enter none</label>
      <input
        placeholder="Overwatch Region"
        value={overwatchRegion}
        onChange={(e) => setOverwatchRegion(e.target.value)}
      />

      <label>Enter your Apex Legends gamertag or enter none</label>
      <input
        placeholder="Apex Gamertag"
        value={apexLegends}
        onChange={(e) => setApexLegends(e.target.value)}
      />

      <label>Enter your Apex Legends Platform from list: PC, PS4, X1</label>
      <input
        placeholder="ApexLegends Platform"
        value={apexLegendsPlatform}
        onChange={(e) => setApexLegendsPlatform(e.target.value)}
      />

      <label>Enter your chess username or enter none</label>
      <input
        placeholder="Chess username"
        value={chess}
        onChange={(e) => setChess(e.target.value)}
      />

      <button
        type="submit"
        style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
      >
        Submit
      </button>
    </form>
    </div>
  );
 
};

export default EditProfile;