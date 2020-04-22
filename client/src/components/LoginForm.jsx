import React from "react";
import axios from 'axios'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                console.log(this.state);
                console.log('Res here', res);
                this.props.setLogged();
                console.log('local', localStorage);
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="justify-content-center align-items-center d-flex flex-column">
                <form method="post" onSubmit={this.handleSubmit} className="mt-5 py-3 card col-4 ">
                    <h3 className="mb-4">Login</h3>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Password </label>
                        <input className="form-control" type="password" id="passwordInput" value={this.state.password}
                               onChange={this.handleChange}/>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Envoyer"/>
                    <p>{this.state.password}</p>
                </form>
                {this.props.isLogged ? <p className="mt-5"> You're Logged </p> : <p className="mt-5">Wrong password</p>}
            </div>
        );
    }
}

export default LoginForm;
