import React from "react";
import Alert from 'react-bootstrap/Alert';

class AlertComponent extends React.Component {

    render() {
        return (
            <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                   Something went wrong , TODO : Right the correct message for every error issues
                </p>
            </Alert>
        )
    }
}
export default AlertComponent;
