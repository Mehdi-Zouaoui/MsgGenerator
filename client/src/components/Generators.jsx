import React from 'react';
import axios from 'axios'

// const database = require('../../../server/database');

const lodash = require('lodash');

class Generators extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            generatorsArray: []
        };

    }

    async componentDidMount() {
        const response = await fetch('/generators');
        const data = await response.json();
        return this.setState({generatorsArray: data.generators});
    }


    render() {
        let clone = lodash.cloneDeep(this.state);
        console.log(this.state);
        let generatorList = clone.generatorsArray.map(function (generator) {
            async function deleteGenerator(id) {
                console.log(id);
                await axios.get('/generators' , id
                )
                    .then(res => {
                        console.log(res);
                        console.log('clicked');
                    })
                    .catch(() => {
                        console.log('no data')
                    });
            }

            // fetch('generators/', {data: {id: generator._id}}, {
            //     method: 'DELETE'
            // }).then((res) => {
            //     res.json()
            //         .then(parsedJSON => console.log(parsedJSON.results))
            //         .catch(error => console.log(error))
            //
            // });


            return (
                <li className="card" key={generator._id}>
                    <div className=" d-flex">
                        <h2 className="card-header col-2">{generator.name} - {generator._id}</h2>
                        <div className="col-1">{generator.socialNetworks.join('\n')}</div>
                        <div
                            className="col-6 d-flex justify-content-center align-items-center">{generator.keywords.join('\n')}</div>
                        <div className="col-1">Interval : {generator.minNumber} - {generator.maxNumber}</div>
                        <div className="col-1"> Modèle : {generator.generatorModel}</div>
                        <button className="btn btn-danger col-1" onClick={() => deleteGenerator(generator._id)}>Delete
                        </button>
                    </div>
                </li>
            );
        });
        return (
            <div className="text-center">
                <h1 className='my-3'> Generators Liste</h1>
                <div>{generatorList}</div>
            </div>

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
