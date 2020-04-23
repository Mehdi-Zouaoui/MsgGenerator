import React from 'react';
import axios from 'axios'

// const database = require('../../../server/database');

const lodash = require('lodash');

class Generators extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            generatorsArray: [],
            updatedGeneratorsArray: [],
            updated: false
        };
    }

    async componentDidMount() {
        const response = await fetch('/generators');
        const data = await response.json();
        return this.setState({generatorsArray: data.generators});
    }

    async deleteGenerator(id) {
        let clone = lodash.cloneDeep(this.state.generatorsArray);

        clone.splice(clone.findIndex(generator => generator._id === id), 1);
        this.setState({updatedGeneratorsArray: clone, updated: true}, () => {
            console.log(this.state);
            console.log(id);
        });
        await axios.delete('/generator/' + id
        )
            .then(res => {
                console.log('RES GHERE', res)
            })
            .catch(() => {
                console.log('no data')
            });

    }

    render() {

        return (
            <div className="text-center">
                <h1 className='my-3'> Generators Liste</h1>
                <Generator delete={this.deleteGenerator.bind(this)}
                           array={this.state.updated ? this.state.updatedGeneratorsArray : this.state.generatorsArray}/>
            </div>
        );
    }

}

class Generator extends React.Component {

    delete(id) {
        this.props.delete(id);
    }

    render() {
        return (
            this.props.array.map(generator =>
                <li className="card" key={generator._id}>
                    <div className=" d-flex">
                        <h2 className="card-header col-2">{generator.name} - {generator._id}</h2>
                        <div className="col-1">{generator.socialNetworks.join('\n')}</div>
                        <div
                            className="col-6 d-flex justify-content-center align-items-center">{generator.keywords.join('\n')}</div>
                        <div className="col-1">Interval : {generator.minNumber} - {generator.maxNumber}</div>
                        <div className="col-1"> Modèle : {generator.generatorModel}</div>
                        <button className="btn btn-danger col-1" onClick={() => this.delete(generator._id)}>Delete
                        </button>
                    </div>
                </li>
            )
        );
    }

}

// async function getData() {
//     try {
//         const response = await fetch('/generators');
//         const data = await response.json();
//         console.log(data);
//         return data ;
//     } catch (e) {
//         return e;
//     }
//
//
// }
export default Generators;
