import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay, faPause, faEdit} from "@fortawesome/free-solid-svg-icons";
class ControlButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStarted: false
        }
    }

    started(id) {
        this.setState({isStarted: true});
        this.props.start(id);
        console.log(this.state.isStarted)
    }

    stopped(id) {
        this.setState({isStarted: false});
        this.props.stop(id);
        console.log(this.state.isStarted)
    }

    render() {
        return (
            <div style={{paddingRight : 0 , paddingLeft : 0}} >
                {this.state.isStarted ?
                    <button className="btn h-100 mr-1 btn-ico btn-danger"
                            onClick={() => this.stopped(this.props.id)}><FontAwesomeIcon style={{color : 'white'}} icon={faPause} /></button>
                    :
                    <button className="btn mr-1 btn-ico btn-success"
                            onClick={() => this.started(this.props.id)}><FontAwesomeIcon style={{color : 'white'}} icon={faPlay} /></button>
                }
            </div>

        )
    }


}

export default ControlButton
