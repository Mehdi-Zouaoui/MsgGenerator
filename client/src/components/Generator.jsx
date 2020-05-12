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
        // if(!this.props.isLogged){
        //     return <Redirect to={'/login'}/>
        // }
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            this.props.array.map(generator =>
                <li className="card" key={generator._id}>
                    <div className=" d-flex">
                        <h2 className="card-header col-2">{generator.name} </h2>
                        <div className="col-1">{generator.socialNetworks.join('\n')}</div>
                        <div
                            className="col-4 d-flex justify-content-center align-items-center">{generator.keywords.length > 1 ? generator.keywords.join('\n') :'text'}</div>

                        <div className="col-2 my-auto">
                            <h5>Interval </h5>
                            <div>{generator.minNumber} - {generator.maxNumber}</div>
                        </div>

                        <div className="col-2 my-auto">
                            <h5>Modèle </h5>
                            <div>{generator.generatorModel}</div></div>
                        <div>
                            <button className="btn btn-info col-12 h-50"
                                    onClick={() => this.update(generator._id)}>Update
                            </button>

                            <button className="btn btn-danger col-12 h-50"
                                    onClick={() => this.delete(generator._id)}>Delete
                            </button>
                        </div>
                    </div>
                </li>
            )
        );
    }
}

export default Generator
