import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";

const lodash = require('lodash');

const formStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto'
};

class GeneratorForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            updated: false,
            redirect: null,
            name: '',
            facebookChecked: false,
            youtubeChecked: false,
            instagramChecked: false,
            twitchChecked: false,
            twitterChecked: false,
            socialNetworks: [],
            speed: 0,
            keywords: '',
            minNumber: 0,
            maxNumber: 0,
            generatorModel: ''
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeKeywords = this.changeKeywords.bind(this);
        this.changeSpeed = this.changeSpeed.bind(this);
        this.changeModel = this.changeModel.bind(this);
        this.onMinChange = this.onMinChange.bind(this);
        this.onMaxChange = this.onMaxChange.bind(this);
    }
    redirectTo() {
        this.setState({redirect: '/generators'})
    };

    getGeneratorWithId() {
        axios.get('/generator/' + this.props.match.params.id).then((res) => {
            console.log('updateRes', res);
            let data = res.data.updatedGenerator;
            if (data.socialNetworks.find(socialNetwork => socialNetwork === 'facebook')) this.setState({facebookChecked: true});
            if (data.socialNetworks.find(socialNetwork => socialNetwork === 'youtube')) this.setState({youtubeChecked: true});
            if (data.socialNetworks.find(socialNetwork => socialNetwork === 'instagram')) this.setState({instagramChecked: true});
            if (data.socialNetworks.find(socialNetwork => socialNetwork === 'twitch')) this.setState({twitchChecked: true});
            if (data.socialNetworks.find(socialNetwork => socialNetwork === 'twitter')) this.setState({twitterChecked: true});
            this.setState({
                updated: true,
                name: data.name,
                speed: data.speed,
                keywords: data.keywords,
                minNumber: data.minNumber,
                maxNumber: data.maxNumber,
                generatorModel: data.generatorModel
            });
            return data;
        }).catch((err) => {
            console.log(err)
        });
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.getGeneratorWithId();
            console.log(this.props);
        }
    }

    changeName(event) {
        const value = event.target.value;
        this.setState({
            name: value
        })
    }

    changeKeywords(event) {
        const value = event.target.value;
        this.setState({
            keywords: value
        })
    }

    changeSpeed(event) {
        const value = event.target.value;
        this.setState({
            speed: value
        })
    }

    changeModel(event) {
        const value = event.target.value;
        this.setState({
            generatorModel: value
        })
    }

    onMinChange(event) {
        const value = event.target.value;
        this.setState({
            minNumber: value
        })
    }

    onMaxChange(event) {
        const value = event.target.value;
        this.setState({
            maxNumber: value
        })
    }

    onChangeFacebook() {
        this.setState({facebookChecked: !this.state.facebookChecked})
    }

    onChangeYoutube() {
        this.setState({youtubeChecked: !this.state.youtubeChecked})
    }

    onChangeInstagram() {
        this.setState({instagramChecked: !this.state.instagramChecked})
    }

    onChangeTwitch() {
        this.setState({twitchChecked: !this.state.twitchChecked})
    }

    onChangeTwitter() {
        this.setState({twitterChecked: !this.state.twitterChecked})
    }


    handleSubmit(event) {
        let stateClone = lodash.cloneDeep(this.state);

        if (stateClone.facebookChecked) stateClone.socialNetworks.push('facebook');
        if (stateClone.youtubeChecked) stateClone.socialNetworks.push('youtube');
        if (stateClone.instagramChecked) stateClone.socialNetworks.push('instagram');
        if (stateClone.twitchChecked) stateClone.socialNetworks.push('twitch');
        if (stateClone.twitterChecked) stateClone.socialNetworks.push('twitter');
        this.setState({redirect: '/generators'});
        event.preventDefault();

        if (!this.state.updated) {
            axios.put('/generator', stateClone).then(
                res => {
                    console.log('Generator res', res);
                }
            ).catch(err => console.log(err))
        } else {
            axios.put('/generator/' + this.props.match.params.id, stateClone).then(
                res => {
                    console.log('Generator res', res);
                }
            ).catch(err => console.log(err))
        }

    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <div style={{height: "100vh"}} className=" bg-dark text-center">
                <div>
                    <div className="row col-12 d-flex justify-content-center text-center m-auto my-5">
                    <h1 className="  col-10 text-light display-4">Formulaire de création</h1>
                        <button className="mt-4 btn btn-warning h-100 col-1" onClick={this.redirectTo.bind(this)}> <FontAwesomeIcon style={{color : 'white'}} icon={faArrowAltCircleLeft} /></button>
                    </div>
                    <form style={formStyle} method="PUT" onSubmit={this.handleSubmit}
                          className="mt-5 py-3 card col-10 bg-dark border border-info ">
                        <div className="row col-6">
                            <label htmlFor="name" className="h3 text-light ">Nom du Generateur</label>
                            <input type="text" id='name' className="form-control" onChange={this.changeName}
                                   placeholder="Generateur" value={this.state.name}/>
                        </div>
                        <div className=" row col-6">
                            <label htmlFor="socialNetworks" className="text-light h4 mt-3"> Réseaux Sociaux</label>
                            <div id="socialNetworks" className='col-12 row'>
                                <div className="form-check form-check-inline ">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1"
                                           checked={this.state.facebookChecked} onChange={() => this.onChangeFacebook()}
                                           value="option1"/>
                                    <label className="form-check-label text-light"
                                           htmlFor="inlineCheckbox1">Facebook</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2"
                                           checked={this.state.youtubeChecked} onChange={() => this.onChangeYoutube()}
                                           value="option2"/>
                                    <label className="form-check-label text-light"
                                           htmlFor="inlineCheckbox2">Youtube</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox3"
                                           checked={this.state.instagramChecked}
                                           onChange={() => this.onChangeInstagram()}
                                           value="option3"/>
                                    <label className="form-check-label text-light"
                                           htmlFor="inlineCheckbox3"> Instagram </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox4"
                                           checked={this.state.twitchChecked} onChange={() => this.onChangeTwitch()}
                                           value="option4"/>
                                    <label className="form-check-label text-light"
                                           htmlFor="inlineCheckbox4"> Twitch </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox5"
                                           checked={this.state.twitterChecked} onChange={() => this.onChangeTwitter()}
                                           value="option5"/>
                                    <label className="form-check-label text-light"
                                           htmlFor="inlineCheckbox5"> Twitter </label>
                                </div>
                            </div>
                        </div>

                        <div className='mt-3 col-6 row h4 text-light'>Vitesses des commentaire (com/min) <input
                            type="number" className="form-control mt-2" value={this.state.speed}
                            onChange={this.changeSpeed}/>

                        </div>
                        <div className='row'>
                            <div className="col-12 ">
                                <label htmlFor="exampleFormControlTextarea1"
                                       className="display-4 col-6 my-4 text-light">Options</label>
                                <div className="card">
                                    <div className="card-header bg-info h5 text-light">KeyWords</div>
                                    <textarea className="form-control" id="exampleFormControlTextarea1"
                                              placeholder={'keyword' + '\n' + 'keyword'}
                                              value={this.state.keywords.toString().split(',').join('\n')}
                                              onChange={this.changeKeywords} rows="3"/>

                                </div>
                            </div>

                            <div className="col-6 mt-2">
                                <div className="form-group col-12 text-light">
                                    <div className="h5 text-center">Nombre compris entre</div>
                                    <div className='row'><input type="number" className="form-control text-center"
                                                                value={this.state.minNumber}
                                                                onChange={this.onMinChange}/>
                                        <div className='h5 col-12'>et</div>
                                        <input type="number"
                                               className="form-control text-center"
                                               value={this.state.maxNumber}
                                               onChange={this.onMaxChange}/>
                                    </div>
                                </div>

                            </div>
                            <div className="col-6 mt-4">
                                <div className="card ">
                                    <div className="card-header bg-info h5 text-light">Modèle de commentaires</div>
                                    <textarea className="form-control" id="exampleFormControlTextarea1"
                                              placeholder={'[word]' + '\n' + '[number]'}
                                              value={this.state.generatorModel.toString().split(',').join('\n')}
                                              onChange={this.changeModel} rows="3"/>
                                </div>
                            </div>
                        </div>
                        <input className="btn mt-3 btn-info col-2 " type="submit" value="Envoyer"/>
                    </form>
                </div>
            </div>

        )
    }
}

export default GeneratorForm
