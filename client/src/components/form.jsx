import React from "react";
import axios from 'axios'
class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {password: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        console.log('Le mot de passe a été soumis : ' + this.state.password);
        event.preventDefault();
        axios.post('/login' , this.state)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {
        return (
            <form method="post" onSubmit={this.handleSubmit}>
                <label>
                    Password :
                    <input type="password" value={this.state.password} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Envoyer"/>
                <p>{this.state.password}</p>
            </form>
        );
    }
}
export default LoginForm;
