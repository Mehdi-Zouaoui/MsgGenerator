import React, {Component} from 'react';

// les noms de fichiers doivent avoir le nom du composant sinon on ne s'y retourve plus. Donc renommes ton fichier en HomePage.jsx stp
import HomePage from "./components/homapage";
import {BrowserRouter, Route, Link} from "react-router-dom";
import './App.css';

// les noms de fichiers doivent avoir le nom du composant sinon on ne s'y retourve plus. Donc renommes ton fichier en LoginForm.jsx stp
import LoginForm from "./components/form";


import Header from "./components/header";

// import {Cookies} from 'react-cookie';
// import {instanceOf} from "prop-types";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        };
        this.storedState = localStorage.getItem('state');
        this.setLogged = this.setLogged.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    // static propTypes = {
    //     cookies: instanceOf(Cookies).isRequired
    // };

    signOut() {
        this.setState({isLogged: false});
        localStorage.setItem('state', JSON.stringify(this.state));
    }

    setLogged() {
        // Gerer le local Storage*
        this.setState({isLogged: true});
        localStorage.setItem('state', JSON.stringify(this.state));
    }

    componentDidMount() {

        const state = JSON.parse(this.storedState).isLogged;
        console.log(state);
    }

        // Call our fetch function below once the component mounts


    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js


    render() {

        return (

            <div className="App container-fluid justify-content-center" style={{paddingLeft: 0, paddingRight: 0}}>
                {/*<ul>*/}
                {/*    <li><Link to='/login'> Login </Link></li>*/}
                {/*    <li><Link to="/"> HomePage</Link></li>*/}
                {/*</ul>*/}
                <Header signOut={this.signOut}/>
                <HomePage/>
                <LoginForm setLogged={this.setLogged} storedState={this.storedState}/>

                {/*<Route exact path="/login" component={LoginForm}/>*/}
                {/*<Route path="/" component={HomePage}/>*/}
            </div>

        );
    }
}

export default App;
