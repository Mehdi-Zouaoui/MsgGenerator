import React from 'react';
import HomePage from "./components/GeneratorForm";
import './app.css';
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Generators from "./components/Generators";

class App extends React.Component {
    constructor(props) {
        super(props);

        const stateRef = localStorage.getItem('state');
        if (stateRef) {
            this.currentState = JSON.parse(stateRef).isLogged;
        }
        this.state = {
            isLogged: stateRef ? this.currentState : false
        };

        this.setLogged = this.setLogged.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        this.setState({isLogged: false}, () => {
            localStorage.setItem('state', JSON.stringify(this.state));
        });
    }

    setLogged() {
        this.setState({isLogged: true}, () => {
            localStorage.setItem('state', JSON.stringify(this.state));
        });

    }


    render() {

        return (
            <Router>
                <div className="App container-fluid justify-content-center" style={{paddingLeft: 0, paddingRight: 0}}>
                    <Header signOut={this.signOut}/>
                    <Switch>
                        <Route path="/generators" exact component={Generators}/>
                        <Route path="/generator" component={HomePage}/>
                        <Route path="/login" component={LoginForm} setLogged={this.setLogged}
                               isLogged={this.state.isLogged}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
