import React, {useState} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

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

        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeKeywords = this.changeKeywords.bind(this);
        this.changeSpeed = this.changeSpeed.bind(this);
        this.changeModel = this.changeModel.bind(this);
        this.onMinChange = this.onMinChange.bind(this);
        this.onMaxChange = this.onMaxChange.bind(this);
        // this.handleChecked = this.handleChecked.bind(this);
    }

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
        if(this.props.match.params.id){
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

    // handleChecked() {
    //     this.setState({isChecked: !this.state.isChecked});
    // }

    handleSubmit(event) {
        debugger
        let stateClone = lodash.cloneDeep(this.state);
        console.log('Clone ici ', stateClone);
        if (this.state.keywords.length > 1) {
            stateClone.keywords = this.state.keywords.split('\n');
        }
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
            )
        } else {
            axios.put('/generator/' + this.props.match.params.id, stateClone).then(
                res => {
                    console.log('Generator res', res);

                }
            )
        }

    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <div>
                <h1 className="my-5">Cliclic Message Generator {this.props.match.params.id}</h1>
                {/*<button onClick={this.doYouHaveCookie()}> Cookie</button>*/}
                <form style={formStyle} method="PUT" onSubmit={this.handleSubmit} className="mt-5 py-3 card col-10 ">
                    {/*<FormHeader*/}
                    {/*<Options/>*/}
                    {/*<Config/>*/}

                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="name">Nom du Generateur</label>
                            <input type="text" id='name' className="form-control" onChange={this.changeName}
                                   placeholder="Generateur" value={this.state.name}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="socialNetworks">Réseaux Sociaux</label>
                            <div id="socialNetworks">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1"
                                           checked={this.state.facebookChecked} onChange={() => this.onChangeFacebook()}
                                           value="option1"/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox1">Facebook</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2"
                                           checked={this.state.youtubeChecked} onChange={() => this.onChangeYoutube()}
                                           value="option2"/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox2">Youtube</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox3"
                                           checked={this.state.instagramChecked}
                                           onChange={() => this.onChangeInstagram()}
                                           value="option3"/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox3"> Instagram </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox4"
                                           checked={this.state.twitchChecked} onChange={() => this.onChangeTwitch()}
                                           value="option4"/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox4"> Twitch </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox5"
                                           checked={this.state.twitterChecked} onChange={() => this.onChangeTwitter()}
                                           value="option5"/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox5"> Twitter </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>Vitesses des commentaire <input type="number" value={this.state.speed}
                                                                          onChange={this.changeSpeed}/>com/min
                    </div>
                    <div className="col-12">
                        <h2>Options</h2>
                        <div className="d-flex justify-content-around">
                            <div className="card">
                                <div className="card-body form-group">
                                    <div className="card-header">KeyWords</div>
                                    <textarea className="form-control" id="exampleFormControlTextarea1"
                                              value={this.state.keywords} onChange={this.changeKeywords} rows="3"/>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="card-title">Nombre compris entre</div>
                                        <div><input type="number" value={this.state.minNumber}
                                                    onChange={this.onMinChange}/> et <input type="number"
                                                                                            value={this.state.maxNumber}
                                                                                            onChange={this.onMaxChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body form-group">
                                    <div className="card-header">Modèle de commentaires</div>
                                    <textarea className="form-control" id="exampleFormControlTextarea1"
                                              value={this.state.generatorModel} onChange={this.changeModel} rows="3"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Envoyer"/>
                </form>
            </div>

        )
    }
}

export default GeneratorForm
