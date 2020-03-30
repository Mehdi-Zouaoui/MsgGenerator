import React, {Component} from 'react';
import HomePage from "./components/homapage";
import './App.css';
import LoginForm from "./components/form";

class App extends Component {
    state = {
        data: null,
        logged: false
    };

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
            <div className="App">
               <LoginForm/>
                <p className="App-intro">{this.state.data}</p>
              <p>{this.state.logged}</p>
                <HomePage/>
            </div>
        );
    }
}

export default App;
