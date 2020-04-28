import React from 'react';
import axios from 'axios'
import Generator from './Generator'
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

    componentDidMount() {
        this.refresh().then(r => console.log(r));
    }

    async refresh() {
        const response = await fetch('/generators');
        const data = await response.json();
        return this.setState({generatorsArray: data.generators});
    }

    async deleteGenerator(id) {
        let clone = lodash.cloneDeep(this.state.generatorsArray);
        clone.splice(clone.findIndex(generator => generator._id === id), 1);
        this.setState({generatorsArray: clone}, () => {
            console.log(this.state);
            console.log(id);
        });
        await axios.delete('/generator/' + id)
            .catch((err) => {
                if (err.response.status === 404) {
                    console.log('Missing Id', err);
                    this.refresh();
                } else if (err.response.status === 500) {
                    alert('Internal Server Error')
                }
                // window.location = '/login';
            })


    }

    update(id) {
        window.location = '/login:id'
    }

    render() {

        return (
            <div className="text-center">
                <h1 className='my-3'> Generators Liste</h1>
                <Generator delete={this.deleteGenerator.bind(this)}
                           array={this.state.generatorsArray}
                           update={this.update.bind(this)}/>
            </div>
        );
    }

}

export default Generators;
