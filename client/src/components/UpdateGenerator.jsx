import React from 'react';
import axios from "axios";

class UpdateGenerator extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          generatorData : {}
        };
    }

    componentDidMount() {
        axios.put('/generator/' + this.props.params.id).then((res) => {
            console.log('updateRes' , res);
            this.setState({generatorData : res})
        }).catch((err) => {
            console.log(err)
        });
    }

    handleSubmit(data) {

    }
    render() {
        return(
            <div>
            Update
                {this.state.generatorData}
            </div>
        )
    }
}
export default UpdateGenerator
