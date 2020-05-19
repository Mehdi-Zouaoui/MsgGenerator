import React from 'react';
import './app.css';
import LoginForm from "./components/LoginForm";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import GeneratorList from "./components/GeneratorList";
import GeneratorForm from "./components/GeneratorForm";
import {ProtectedRoute} from "./components/protacted-route";
import auth from "./components/auth";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoute: null
        };
    }

    render() {
        return (
            <Router>
                {auth.authenticated ? <Redirect to='/generators'/> : <Redirect to='/login'/> }
                <div className="App container-fluid justify-content-center bg-dark"
                     style={{paddingLeft: 0, paddingRight: 0}}>
                    <Switch>
                        <ProtectedRoute path="/generators" component={GeneratorList}
                        />
                        <ProtectedRoute path="/generator/:id?" component={GeneratorForm}
                        />
                        <Route path="/login" component={LoginForm}
                        />
                    </Switch>

                </div>
            </Router>
        );
    }
}


export default App;
