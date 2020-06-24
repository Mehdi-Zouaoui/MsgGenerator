import React from "react";
import {Redirect} from "react-router-dom";
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


    }

    start(id) {
        return this.props.start(id).then((item) => {
            return item
        })
    }

    isStarted(id) {
        return this.props.isStarted(id).then((item) => {
            return item
        })

    }

    stop(id) {
        return this.props.stop(id).then((item) => {
            return item
        });
    }

    update(id) {
        this.props.id(id);
        this.setState({redirect: '/generator/' + id});
    }

    render() {
        // this.props.array.forEach(generator =>{
        //     console.log('GENERATOR OJIABC' , generator)
        // });
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            this.props.array.map(generator =>
                <li className="card" key={generator.id}>

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
                            <div>{generator.model}</div>
                        </div>
                        <div className="col-2 d-flex flex-column justify-content-center align-items-center border"
                             style={styles.col}>
                            <div style={{paddingRight: 0, paddingLeft: 0}} className=' d-flex  '>
                                <button className="btn mr-1 h-100 btn-ico btn-outline-secondary"
                                        onClick={() => this.update(generator.id)}><FontAwesomeIcon
                                    icon={faEdit}
                                />
                                </button>

                                <DeleteModal delete={this.delete.bind(this)} id={generator.id}/>
                                <ControlButton stop={this.stop.bind(this)} start={this.start.bind(this)}
                                               id={generator.id} isStarted={this.isStarted.bind(this)}/>
                            </div>


                        </div>
                    </div>
                </li>
            )
        );
    }
}

export default Generator
