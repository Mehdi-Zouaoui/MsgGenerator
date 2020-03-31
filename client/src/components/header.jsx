import React from "react";
import logo from '../assets/logo.png'

class Header extends React.Component{

    render() {
        return (
        <nav className="navbar navbar-light bg-primary" >
            <a className="navbar-brand" href="#">
                <img src={logo} alt="logo" style={{ width : 30 , height: 30}}/>
            </a>
        </nav>
        )
    }
}
export default Header;
