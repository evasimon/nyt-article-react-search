// * **Main** - contains the main-container div that holds the main layout and navigation. 
// This component should also be able to hold sub-components Search and Saved

import React, { Component } from "react";
import Saved from "../Saved";
import Search from "../Search";
import Nav from "../../components/Nav";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom'

class Main extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Search} />
                        <Route exact path="/articles" component={Saved} />
                        {/* <Route component={NoMatch} /> */}
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Main;