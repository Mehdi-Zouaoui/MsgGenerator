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
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
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
                <Button variant="btn mr-1 h-100 btn-ico btn-outline-secondary" onClick={this.handleShow}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Supprimer ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Voulez-vous vraiment supprimer le generateur ?</Modal.Body>
                    <Modal.Footer>
                    <Button className='btn btn-success' onClick={() => this.delete(this.props.id)}>
                        Oui
                    </Button>
                    <Button className='btn btn-danger' onClick={this.handleClose} >
                        Non
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
export default DeleteModal


