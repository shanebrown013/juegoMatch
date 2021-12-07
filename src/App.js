import React from 'react';
import Header from './Header';
import TinderCards from './TinderCards';
import Loginpage from './Loginpage';
import Statsview from './Statsview';
import Homepage from './Homepage';
import Home_header from './Home_header';
import Supported_apis from './Supported_apis';
import Profilepage from './Profilepage';
import EditProfile from './EditProfile';

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">

      <Router>
            
            <Switch>

              <Route path = "/editprofile">
                <EditProfile/>
              </Route>
              
              <Route exact path = "/userstats">
                <Header />
                <Statsview/>
              </Route>

              <Route path = "/userstats/:name">
                <Header />
                <Statsview/>
              </Route>
              
              <Route path = "/profile">
                <Profilepage />
              </Route>
              
              <Route path = "/swipepagemain">
                <Header />
                <TinderCards />
              </Route>

              <Route path = "/login">
                <Loginpage />
              </Route>

              <Route path = "/supportedapis">
                <Home_header />
                <Supported_apis />
              </Route>

              <Route path = "/">
                <Home_header />
                <Homepage />
              </Route>

            </Switch>

      </Router>


    </div>
  );
}

export default App;
