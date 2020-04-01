import React from "react";
import axios from 'axios'

class LoginForm extends React.Component {
    //props : paramètre du composant définit depuis l'extérieur ( state parent par exemple ) pas possible dde modifigfier les props depuis l'interieur du compasant
    constructor(props) {

        super(props);
        //State état INTERNE au composant ( Que les propriétées qui servent au composant) possible de modifier depuis le composant
        // Chaque fois que les props ou les states se modifient réexecuter la fonction render() du composant.
        this.state = {
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.props);
    }
    isLogged (){
        this.props.setLogged();
    }
    // changeParentState(){
    //
    // }
    handleChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {

        console.log('Le mot de passe a été soumis : ' + this.state.password);
        event.preventDefault();
        axios.post('/login', this.state)
            .then(res => {
                console.log('Res here', res);
                // this.state.logged = res.data.logged;  il est interdit dans react de modifier le state de cette manière. Il faut obligatoirement utiliser setState()
               this.isLogged();
                console.log('local', localStorage);
            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {

        return (
            <div className="justify-content-center align-items-center d-flex flex-column">
                <form method="post" onSubmit={this.handleSubmit} className="mt-5 py-3 card col-4">
                    <h3 className="mb-4">Login</h3>
                    <div className="form-group">
                        <label htmlFor="passwordInput">Password </label>
                        <input className="form-control" type="password" id="passwordInput" value={this.state.password}
                               onChange={this.handleChange}/>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Envoyer"/>
                    <p>{this.state.password}</p>
                </form>
                {this.state.logged ? <p className="mt-5"> You're Logged </p> : <p className="mt-5">Wrong password</p>}

            </div>
        );
    }
}

export default LoginForm;
