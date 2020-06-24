import React from 'react';
import axios from 'axios'
import Generator from './Generator'
import AlertComponent from "./AlertComponent";
import {Redirect} from "react-router-dom";
import auth from "./auth";


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
        this.deleteGenerator = this.deleteGenerator.bind(this);
        this.update = this.update.bind(this);
        this.startFlow = this.startFlow.bind(this);
        this.stopFlow = this.stopFlow.bind(this);
        this.isStarted = this.isStarted.bind(this);

    }

    componentDidUpdate() {
        this.refresh();
        if (!window.localStorage.logged) {
            this.setState({redirect: './login'});
            this.refresh();
        }
    }

    componentDidMount() {
        this.refresh().then(r => console.log(r));
        console.log(this.state.generatorsArray)
    }

    async refresh() {
        let success = false;
        const response = await fetch('/generators').then((res) => {
            if (res.status === 401) {
                auth.logout();
                this.setState({redirect: './login'})
            }
            if (res.status === 200) {
                success = true;
                return res
            }
        });
        if (success) {
            const data = await response.json();
            return this.setState({generatorsArray: data.generators, error: false});
        } else {
            console.log(`Something went wrong`)
        }
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
        console.log('GeneratorList');
        return axios.get('/generator/' + id + '/start').then(generator => {
            return generator
        }).catch(err => {
            return err
        })
    }

    stopFlow(id) {
        return axios.get('/generator/' + id + '/stop').then(generator => {
            console.log('Axios stop request');
            return generator;
        }).catch(err => {
            return err
        })
    }

    isStarted(id) {
        return axios.get('/generator/' + id).then(generator => {
            console.log(generator)
        }).catch(err => {
            return err
        })
    }

    update(id) {
        return () => {
            this.setState({id: id})
        }
    }

    redirectTo() {
        this.setState({redirect: '/generator'})
    };

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <div style={{height: "100vh"}} className=" bg-dark text-center">
                <div className="row col-12 m-auto">
                    <h1 className='my-3 text-light col-10'> Generators Liste</h1>
                    <button className=" mt-4 btn btn-info h-100 col-2 mb-2" onClick={this.redirectTo.bind(this)}>+
                        Générateur
                    </button>
                </div>
                <div>{this.state.error ? <AlertComponent/> : ''}</div>
                {this.state.generatorsArray.length > 0 ? <Generator delete={this.deleteGenerator}
                                                                    array={this.state.generatorsArray}
                                                                    id={this.update}
                                                                    start={this.startFlow}
                                                                    stop={this.stopFlow}
                                                                    isStarted={this.isStarted}/>
                    : <h5 className="text-light">Veuillez créer une générateur de message </h5>}
            </div>
        );
    }
}

export default GeneratorList;
