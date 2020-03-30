import React, {Component} from 'react';
import HomePage from "./components/homapage";
import {BrowserRouter, Route, Link} from "react-router-dom";
import './App.css';
import LoginForm from "./components/form";
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
    // static propTypes = {
    //     cookies: instanceOf(Cookies).isRequired
    // };
    // componentWillMount() {
    //     const { cookies } = this.props;
    //     this.state = {
    //         data: null,
    //         logged: false,
    //         token: {cookies}.get('token')
    //     };
    // }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
            .then(res => this.setState({data: res.express, logged: res.logged}))
            .catch(err => console.log(err));
    }

    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    render() {
        console.log(this.state);
        return (
            <BrowserRouter>
                <div className="App">
                    <ul>
                        <li><Link to='/login'> Login </Link></li>
                        <li><Link to="/"> HomePage</Link></li>
                    </ul>
                    {/*<LoginForm/>*/}
                    {/*  <p className="App-intro">{this.state.data}</p>*/}
                    {/*<p>{this.state.logged}</p>*/}
                    <Route exact path="/login" component={LoginForm}/>
                    <Route path="/" component={HomePage}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
