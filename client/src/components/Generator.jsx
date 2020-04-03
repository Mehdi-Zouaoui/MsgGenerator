import React from "react";
import axios from "axios";

const formStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto'
};

function FormHeader() {
    return (
        <div className="row">
            <div className="col-6">
                <label htmlFor="name">Nom du Generateur</label>
                <input type="text" id='name' className="form-control" placeholder="Generateur"/>
            </div>
            <div className="col-6">
                <label htmlFor="socialNetworks">Réseaux Sociaux</label>
                <div id="socialNetworks">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Facebook</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                        <label className="form-check-label" htmlFor="inlineCheckbox2">Youtube</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"/>
                        <label className="form-check-label" htmlFor="inlineCheckbox3"> Instagram </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4"/>
                        <label className="form-check-label" htmlFor="inlineCheckbox4"> Twitch </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox5" value="option5"/>
                        <label className="form-check-label" htmlFor="inlineCheckbox5"> Twitter </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Config() {
    return (
        <div>Vitesses des commentaire <input type="number"/>com/min</div>
    )
}

function Options() {
    return (
        <div className="col-12">
            <h2>Options</h2>
            <div className="d-flex justify-content-around">
            <div className="card">
                <div className="card-body form-group">
                    <div className="card-header">KeyWords</div>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <div className="card-title">Nombre compris entre</div>
                        <div><input type="number"/> et <input type="number"/></div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body form-group">
                    <div className="card-header">Modèle de commentaires</div>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                </div>
            </div>
            </div>
        </div>
    )
}

class Generator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

    }


    render() {
        return (
            <div>
                <h1 className="my-5">Cliclic Message Generator</h1>
                {/*<button onClick={this.doYouHaveCookie()}> Cookie</button>*/}
                <form style={formStyle} method="put" onSubmit={this.handleSubmit} className="mt-5 py-3 card col-10 ">
                    <FormHeader/>
                    <Options/>
                    <Config/>
                    <input className="btn btn-primary" type="submit" value="Envoyer"/>

                </form>
            </div>

        )
    }
}

export default Generator
