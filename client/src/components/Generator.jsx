import React from "react";
import {Redirect} from "react-router-dom";
import $ from "jquery";
import DeleteModal from "./Modal";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import ControlButton from "./ControlButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                            className="col-4 d-flex bg-light  border justify-content-center align-items-center">{generator.keywords.length > 1 ? generator.keywords : 'text'}</div>

                        <div className="col-2 border">
                            <h5>Interval </h5>
                            <div>{generator.minNumber} - {generator.maxNumber}</div>
                        </div>

                        <div className="col-2 border bg-light">
                            <h5>Modèle </h5>
                            <div>{generator.generatorModel}</div>
                        </div>
                        <div className="col-1 d-flex border" style={styles.col}>
                            <div style={{paddingRight : 0 , paddingLeft : 0}} className='col-6 d-flex flex-column'>
                                <button className="btn btn-info  h-50"
                                        onClick={() => this.update(generator._id)}><FontAwesomeIcon
                                    style={{color: 'white'}}
                                    icon={faEdit}/>
                                </button>

                                <DeleteModal delete={this.delete.bind(this)} id={generator._id}/>
                            </div>

                            <ControlButton stop={this.stop.bind(this)} start={this.start.bind(this)}
                                           id={generator._id}/>

                        </div>
                    </div>
                </li>
            )
        );
    }
}

export default Generator
