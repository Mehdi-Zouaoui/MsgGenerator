import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";

class ControlButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStarted: false
        }
    }

    componentDidMount() {

        this.props.isStarted(this.props.id).then((item) => {
            console.log(item);
            // this.setState({isStarted: item.data.updatedGenerator.isStarted})
        })
    }

    started(id) {
        this.props.start(id).then((item) => {
            console.log(item);
            this.setState({isStarted: item.data.startedGenerator.ops[0].isStarted});
        });
    }

    stopped(id) {
        this.props.stop(id).then((item) => {
            console.log(item);
            this.setState({isStarted: item.data.stoppedGenerator.ops[0].isStarted});
        });
    }

    render() {
        return (
            <div style={{paddingRight: 0, paddingLeft: 0}}>
                {this.state.isStarted ?
                    <button className="btn h-100 mr-1 btn-ico btn-danger"
                            onClick={() => this.stopped(this.props.id)}><FontAwesomeIcon style={{color: 'white'}}
                                                                                         icon={faPause}/></button>
                    :
                    <button className="btn mr-1 btn-ico btn-success"
                            onClick={() => this.started(this.props.id)}><FontAwesomeIcon style={{color: 'white'}}
                                                                                         icon={faPlay}/></button>
                }
            </div>

        )
    }


}

export default ControlButton
