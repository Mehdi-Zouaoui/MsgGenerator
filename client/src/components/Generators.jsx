import React from 'react';

const lodash = require('lodash');

class Generators extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            generatorsArray: []
        }
    };

    async componentDidMount() {
        const response = await fetch('/generators');
        const data = await response.json();
        return this.setState({generatorsArray: data.generators});
    }

    delete(e){
        e.preventDefault();
    }

    render() {
        let clone = lodash.cloneDeep(this.state);
        console.log(this.state);
        let generatorList = clone.generatorsArray.map(function (generator) {
            return (
                <li key={generator._id}>
                    <h2>{generator.name}</h2>
                    <div>{generator.socialNetworks.join('\n')}</div>
                    <div>{generator.keywords.join('\n')}</div>
                    <div>Interval : {generator.minNumber} - {generator.maxNumber}</div>
                    <div> Modèle : {generator.generatorModel}</div>
                    <button className="btn btn-danger">Delete</button>
                </li>
            );
        });
        return (
            <div> Generators Liste {generatorList}</div>
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
