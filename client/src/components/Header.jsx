import React from "react";
import logo from '../assets/logo.png'
import {Link} from "react-router-dom";
import auth from './auth'
import {Redirect} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <nav className="navbar navbar-light bg-info d-flex">
                    <Redirect to={this.state.redirect}/>
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="logo" style={{width: 30, height: 30}}/>
                    </a>
                    <ul className="nav-links col-10 d-flex justify-content-around mb-0">
                        <Link to="/login">
                            <li className="navbar-brand">Login</li>
                        </Link>
                        <Link className="navbar-brand" to="/generators">
                            <li>Liste</li>
                        </Link>
                        <Link className="navbar-brand" to="/generator">
                            <li>Generator</li>
                        </Link>
                    </ul>
                    <button className="btn btn-dark" onClick={() => {
                        auth.logout(() => {
                            this.setState({redirect: '/generators'});
                        })
                    }}> Sign out
                    </button>
                </nav>
            )
        }
        return (
            <nav className="navbar navbar-light bg-info d-flex">
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="logo" style={{width: 30, height: 30}}/>
                </a>
                <ul className="nav-links col-10 d-flex justify-content-around mb-0">
                    <Link to="/login">
                        <li className="navbar-brand">Login</li>
                    </Link>
                    <Link className="navbar-brand" to="/generators">
                        <li>Liste</li>
                    </Link>
                    <Link className="navbar-brand" to="/generator">
                        <li>Generator</li>
                    </Link>
                </ul>
                <button className="btn btn-dark" onClick={() => {
                    auth.logout(() => {
                        this.setState({redirect: '/generators'});
                    })
                }}> Sign out
                </button>
            </nav>
        )
    }
}

export default Header;
