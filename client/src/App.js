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

class App extends Component {
    // static propTypes = {
    //     cookies: instanceOf(Cookies).isRequired
    // };

    state = {
        data: null,
        logged: false
    };

    componentDidMount() {
        const state = localStorage.getItem('state');
        if(state) {
            this.setState(JSON.parse(state))
        }
        // Call our fetch function below once the component mounts
        // à quoi ça sert ?
        this.callBackendAPI()
            .then(res => this.setState({data: res.express, logged: res.logged}))
            .catch(err => console.log(err));
        console.log(this.state)
    }


    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    // à quoi ça sert ?
    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    render() {

        return (

                <div className="App container-fluid justify-content-center" style={{paddingLeft: 0, paddingRight: 0}}>
                    {/*<ul>*/}
                    {/*    <li><Link to='/login'> Login </Link></li>*/}
                    {/*    <li><Link to="/"> HomePage</Link></li>*/}
                    {/*</ul>*/}
                    <Header/>
                    <HomePage/>
                    <LoginForm/>

                    {/*<Route exact path="/login" component={LoginForm}/>*/}
                    {/*<Route path="/" component={HomePage}/>*/}
                </div>

        );
    }
}

export default App;
