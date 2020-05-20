import React from 'react';
import axios from 'axios'
import Generator from './Generator'
import AlertComponent from "./AlertComponent";
import {Redirect} from "react-router-dom";
import Header from "./Header";


const lodash = require('lodash');

class GeneratorList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
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
        const response = await fetch('/generators').catch(err => console.log('error here ' ,err));
        const data = await response.json();
        return this.setState({generatorsArray: data.generators, error: false});
    }

    deleteGenerator(id) {
        let clone = lodash.cloneDeep(this.state.generatorsArray);
        axios.delete('/generator/' + id).then(() => {
            let findId = clone.findIndex(generator => generator._id === id);
            console.log('sameID', findId);
            if (findId > -1) clone.splice(findId, 1);
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
                        throw err;

                    } else if (err.response.status === 500) {
                        alert('Internal Server Error');
                        throw err;
                    } else {
                        throw err;
                    }
                }
            )
    }

    startFlow(id) {
        axios.get('/generator/' + id + '/start').then(() => {
            console.log('flow started')
        }).catch(err => {
            return err
        })
    }

    stopFlow(id) {
        axios.get('/generator/' + id + '/stop').then(() => {
            console.log('flow stopped')
        }).catch(err => {
            return err
        })
    }

    update(id) {
        return () => {
            this.setState({id: id})
        }
    }

    redirectTo(){
      this.setState({redirect : '/generator'})
    };

    render() {
        if(this.state.redirect){
            return  <Redirect to={this.state.redirect}/>
        }
        return (
            <div style={{height: "100vh"}} className=" bg-dark text-center">
                <div className="row  col-6 m-auto">
                <h1 className='mb-3 text-light col-11'> Generators Liste</h1>
                <button className="btn btn-info col-1 mb-2" onClick={this.redirectTo.bind(this)}>+</button>
                </div>
                <div>{this.state.error ? <AlertComponent/> : ''}</div>
                {this.state.generatorsArray.length > 0 ? <Generator delete={this.deleteGenerator.bind(this)}
                                                                    array={this.state.generatorsArray}
                                                                    id={this.update.bind(this)}
                                                                    start={this.startFlow.bind(this)}
                                                                    stop={this.stopFlow.bind(this)}/>
                    : <h5 className="text-light">Veuillez créer une générateur de message </h5>}


            </div>
        );
    }
}

export default GeneratorList;
