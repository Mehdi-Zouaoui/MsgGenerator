import React from 'react';
import HomePage from "./components/HomePage";
import './App.css';
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";

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
    componentDidMount() {
        const state = JSON.parse(this.storedState).isLogged;
        console.log(state);
    }

    render() {

        return (
            <div className="App container-fluid justify-content-center" style={{paddingLeft: 0, paddingRight: 0}}>
                <Header signOut={this.signOut}/>
                <HomePage/>
                <LoginForm setLogged={this.setLogged} isLogged={this.state.isLogged}/>
            </div>
        );
    }
}

export default App;
