import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class DeleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({show: false})
    }

    handleShow() {
        this.setState({show: true})
    }
    delete(id){
        this.props.delete(id)
    }

    render() {
        return (
            <>
                <Button variant="btn btn-danger h-50" onClick={this.handleShow.bind(this)}>
                    <FontAwesomeIcon style={{color : 'white'}} icon={faTrash} />
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Supprimer ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Voulez-vous vraiment supprimer le generateur ?</Modal.Body>
                    <Modal.Footer>
                    <Button className='btn btn-success' onClick={() => this.delete(this.props.id)}>
                        Oui
                    </Button>
                    <Button className='btn btn-danger' onClick={this.handleClose.bind(this)} >
                        Non
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
export default DeleteModal


