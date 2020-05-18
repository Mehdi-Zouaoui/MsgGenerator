import React from 'react';
import './app.css';
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import GeneratorList from "./components/GeneratorList";
import GeneratorForm from "./components/GeneratorForm";
import Auth from "./components/auth";
import {ProtectedRoute} from "./components/protacted-route";


class App extends React.Component {
    constructor(props) {
        super(props);

        const stateRef = localStorage.getItem('state');
        if (stateRef) {
            this.currentState = JSON.parse(stateRef).isLogged;
        }
        this.state = {
            isLogged: stateRef ? this.currentState : false,
            currentRoute : null
        };
        // this.setLogged = this.setLogged.bind(this);
        // this.signOut = this.signOut.bind(this);
        console.log('logged', this.state.isLogged)
    }


    // signOut() {
    //     this.setState({isLogged: false}, () => {
    //         localStorage.setItem('state', JSON.stringify(this.state));
    //     });
    // }
    //
    // setLogged() {
    //     this.setState({isLogged: true}, () => {
    //         localStorage.setItem('state', JSON.stringify(this.state));
    //     });
    //
    // }

    render() {

        return (
            <Router>
                <Redirect to='./login'/>
                <div className="App container-fluid justify-content-center bg-dark"
                     style={{paddingLeft: 0, paddingRight: 0}}>

                    <Switch>
                        <ProtectedRoute path="/generators" exact component={GeneratorList}
                                        isLogged={this.state.isLogged}/>
                        <ProtectedRoute path="/generator/:id?" component={GeneratorForm} isLogged={this.state.isLogged}/>

                        <Route path="/login" component={LoginForm}
                        />
                    </Switch>

                </div>
            </Router>
        );
    }
}


export default App;
