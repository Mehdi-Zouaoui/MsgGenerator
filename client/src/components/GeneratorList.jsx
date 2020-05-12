import React from 'react';
import axios from 'axios'
import Generator from './Generator'
import AlertComponent from "./AlertComponent";
import {Redirect} from "react-router-dom";


const lodash = require('lodash');

class GeneratorList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : 0,
            redirect: null,
            generatorsArray: [],
            updatedGeneratorsArray: [],
            error: false,
            updated: false
        };

    }

    componentDidUpdate() {
        this.refresh()
    }

    componentDidMount() {
        this.refresh().then(r => console.log(r));
        console.log(this.state.generatorsArray)
    }


    async refresh() {
        const response = await fetch('/generators');
        const data = await response.json();
        return this.setState({generatorsArray: data.generators, error: false});
    }

    deleteGenerator(id) {
        let clone = lodash.cloneDeep(this.state.generatorsArray);
        axios.delete('/generator/' + id).then(() => {
            let findId = clone.findIndex(generator => generator._id === id);
            console.log('sameID' , findId);
            if(findId > -1) clone.splice(findId, 1);
            this.setState({generatorsArray: clone}, () => {
                console.log(this.state);
                console.log(id);
            });
        })
            .catch((err) => {
                this.setState({error: true});
                if (err.response.status === 404) {
                    console.log('Missing Id', err);
                    this.refresh();
                } else if (err.response.status === 500) {
                    alert('Internal Server Error')
                }
            })
    }
    update(id){

        return () => {
            this.setState({id:id})
        }
    }

    render() {

        return (
            <div style={{height : "100vh"}} className=" bg-dark text-center">
                <h1 className='my-3 text-light'> Generators Liste</h1>
                <div>{this.state.error ? <AlertComponent/> : ''}</div>
                <Generator delete={this.deleteGenerator.bind(this)}
                           array={this.state.generatorsArray}
                            id={this.update.bind(this)}/>

            </div>
        );
    }
}

export default GeneratorList;
