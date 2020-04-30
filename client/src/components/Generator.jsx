import React from "react";
import {Redirect} from "react-router-dom";
import AlertComponent from "./AlertComponent";

class Generator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            error: false
        }
    }

    delete(id) {
        this.props.delete(id);
        console.log(this.props)
    }

    update(id) {
        this.props.id(id);
        this.setState({redirect: '/generator/' + id});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            this.props.array.map(generator =>
                <li className="card" key={generator._id}>
                    <div className=" d-flex">
                        <h2 className="card-header col-2">{generator.name} - {generator._id}</h2>
                        <div className="col-1">{generator.socialNetworks.join('\n')}</div>
                        <div
                            className="col-6 d-flex justify-content-center align-items-center">{generator.keywords.join('\n')}</div>
                        <div className="col-1">Interval : {generator.minNumber} - {generator.maxNumber}</div>
                        <div className="col-1"> Modèle : {generator.generatorModel}</div>
                        <div>
                            <button className="btn btn-danger col-12" onClick={() => this.delete(generator._id)}>Delete
                            </button>
                            <button className="btn btn-primary col-12" onClick={() => this.update(generator._id)}>Update
                            </button>
                        </div>
                    </div>
                </li>
            )
        );
    }
}

export default Generator
