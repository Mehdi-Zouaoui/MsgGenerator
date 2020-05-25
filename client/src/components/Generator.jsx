import React from "react";
import {Redirect} from "react-router-dom";
import AlertComponent from "./AlertComponent";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from "@fortawesome/free-solid-svg-icons";

const styles = {
    col: {
        paddingLeft: 0,
        paddingRight: 0
    }
};

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

    start(id) {
        this.props.start(id);
    }

    stop(id) {
        this.props.stop(id);
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
                        <h2 className="card-header col-2 border ">{generator.name}</h2>

                        <div className="col-1 border">{generator.socialNetworks.join('\n')}</div>
                        <div
                            className="col-3 d-flex bg-light  border justify-content-center align-items-center">{generator.keywords.length > 1 ? generator.keywords : 'text'}</div>

                        <div className="col-2 border">
                            <h5>Interval </h5>
                            <div>{generator.minNumber} - {generator.maxNumber}</div>
                        </div>

                        <div className="col-2 border bg-light">
                            <h5>Modèle </h5>
                            <div>{generator.generatorModel}</div>
                        </div>
                        <div className="col-1 border" style={styles.col}>
                            <button className="btn btn-info col-12 h-50"
                                    onClick={() => this.update(generator._id)}>Update
                            </button>

                            <button className="btn btn-danger col-12 h-50"
                                    onClick={() => this.delete(generator._id)}>Delete
                            </button>
                        </div>
                        <div className="col-1 border" style={styles.col}>
                            <button className="btn btn-success col-12 h-50"
                                    onClick={() => this.start(generator._id)}>Start
                            </button>
                            <button className="btn btn-warning col-12 h-50"
                                    onClick={() => this.stop(generator._id)}>Stop
                            </button>
                        </div>
                    </div>
                </li>
            )
        );
    }
}

export default Generator
