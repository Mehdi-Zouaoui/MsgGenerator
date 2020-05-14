import React from "react";
import axios from 'axios';
import App from "../App";
import {Redirect} from "react-router-dom";
import auth from "./auth";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect : null,
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.props);
    }

    handleChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {

        console.log('Le mot de passe a été soumis : ' + this.state.password);
        event.preventDefault();
        axios.post('/login', this.state)
            .then(res => {
                auth.login();
                console.log(this.state);
                console.log('Res here', res);
                console.log('local', localStorage);
                console.log(this.props);
                this.setState({redirect: '/generators'});
            })
            .catch(error => {
                console.log(error);
                alert('Wrong password');
            })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (

            <div style={{height : "100vh"}} className="justify-content-center align-items-center d-flex flex-column">
                <form method="post" onSubmit={this.handleSubmit} className=" py-3 card col-4 ">

                    <h3 className="mb-4">Login</h3>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Password </label>
                        <input className="form-control" type="password" id="passwordInput" value={this.state.password}
                               onChange={this.handleChange}/>
                    </div>
                    <input className="btn btn-info" type="submit" value="Envoyer"/>
                </form>
                {auth.isAuthenticated() ? <p className="mt-5 text-light"> You're Logged </p> : <p className="mt-5 text-light">Wrong password</p>}
            </div>
        );
    }
}

export default LoginForm;
