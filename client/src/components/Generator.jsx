import React from "react";
import {Redirect} from "react-router-dom";
import $ from "jquery"
const styles = {
    col: {
        paddingLeft: 0,
        paddingRight: 0
    }
};
$('#deleteModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
});

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

                            {/*<button type="button" id="myInput" className="btn btn-danger col-12 h-50"*/}
                            {/*        data-toggle="modal" data-target="#deleteModal"*/}
                            {/*       >Delete*/}
                            {/*</button>*/}

                            {/*<div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog"*/}
                            {/*     aria-labelledby="exampleModalLabel" aria-hidden="true">*/}
                            {/*    <div className="modal-dialog" role="document">*/}
                            {/*        <div className="modal-content">*/}
                            {/*            <div className="modal-header">*/}
                            {/*                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>*/}
                            {/*                <button type="button" className="close" data-dismiss="modal"*/}
                            {/*                        aria-label="Close">*/}
                            {/*                    <span aria-hidden="true">&times;</span>*/}
                            {/*                </button>*/}
                            {/*            </div>*/}
                            {/*            <div className="modal-body">*/}
                            {/*                ...*/}
                            {/*            </div>*/}
                            {/*            <div className="modal-footer">*/}
                            {/*                <button type="button" className="btn btn-secondary"*/}
                            {/*                        data-dismiss="modal">Close*/}
                            {/*                </button>*/}
                            {/*                <button type="button" className="btn btn-primary">Save changes</button>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

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
