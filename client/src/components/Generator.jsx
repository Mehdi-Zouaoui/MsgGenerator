import React, {useState} from "react";
import axios from "axios";

const formStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto'
};


// function FormHeader() {
//
//     return (
//         <div className="row">
//             <div className="col-6">
//                 <label htmlFor="name">Nom du Generateur</label>
//                 <input type="text" id='name' className="form-control" placeholder="Generateur"/>
//             </div>
//             <div className="col-6">
//                 <label htmlFor="socialNetworks">Réseaux Sociaux</label>
//                 <div id="socialNetworks">
//                     <div className="form-check form-check-inline">
//                         <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
//                         <label className="form-check-label" htmlFor="inlineCheckbox1">Facebook</label>
//                     </div>
//                     <div className="form-check form-check-inline">
//                         <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
//                         <label className="form-check-label" htmlFor="inlineCheckbox2">Youtube</label>
//                     </div>
//                     <div className="form-check form-check-inline">
//                         <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"/>
//                         <label className="form-check-label" htmlFor="inlineCheckbox3"> Instagram </label>
//                     </div>
//                     <div className="form-check form-check-inline">
//                         <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4"/>
//                         <label className="form-check-label" htmlFor="inlineCheckbox4"> Twitch </label>
//                     </div>
//                     <div className="form-check form-check-inline">
//                         <input className="form-check-input" type="checkbox" id="inlineCheckbox5" value="option5"/>
//                         <label className="form-check-label" htmlFor="inlineCheckbox5"> Twitter </label>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// function Config() {
//     return (
//         <div>Vitesses des commentaire <input type="number"/>com/min</div>
//     )
// }
//
// function Options() {
//     return (
//         <div className="col-12">
//             <h2>Options</h2>
//             <div className="d-flex justify-content-around">
//                 <div className="card">
//                     <div className="card-body form-group">
//                         <div className="card-header">KeyWords</div>
//                         <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
//                     </div>
//                 </div>
//
//                 <div className="card">
//                     <div className="card-body">
//                         <div className="form-group">
//                             <div className="card-title">Nombre compris entre</div>
//                             <div><input type="number"/> et <input type="number"/></div>
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className="card">
//                     <div className="card-body form-group">
//                         <div className="card-header">Modèle de commentaires</div>
//                         <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

class Generator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            facebookChecked: false,
            youtubeChecked: false,
            instagramChecked: false,
            twitchChecked: false,
            twitterChecked: false,
            speed : 0,
            keywords : [],
            interval : '',
            model : []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChecked = this.handleChecked.bind(this);
    }

    handleChange(event) {
        const target = event.target.value;
        this.setState({name: target});
    }

    onChangeFacebook() {
        this.setState({ facebookChecked: !this.state.facebookChecked})
    }
    onChangeYoutube() {
        this.setState({ youtubeChecked: !this.state.youtubeChecked})
    }
    onChangeInstagram() {
        this.setState({ instagramChecked: !this.state.instagramChecked})
    }
    onChangeTwitch() {
        this.setState({ twitchChecked: !this.state.twitchChecked})
    }
    onChangeTwitter() {
        this.setState({ twitterChecked: !this.state.twitterChecked})
    }

    // handleChecked() {
    //     this.setState({isChecked: !this.state.isChecked});
    // }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
        axios.post('/generator', this.state).then(
            res => {
                console.log('Generator res', res);
            }
        )

    }


    render() {
        return (
            <div>
                <h1 className="my-5">Cliclic Message Generator</h1>
                {/*<button onClick={this.doYouHaveCookie()}> Cookie</button>*/}
                <form style={formStyle} method="POST" onSubmit={this.handleSubmit} className="mt-5 py-3 card col-10 ">
                    {/*<FormHeader*/}
                    {/*<Options/>*/}
                    {/*<Config/>*/}

                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="name">Nom du Generateur</label>
                            <input type="text" id='name' className="form-control" onChange={this.handleChange}
                                   placeholder="Generateur" value={this.state.name}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="socialNetworks">Réseaux Sociaux</label>
                            <div id="socialNetworks">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1"
                                           checked={this.state.facebookChecked} onChange={this.onChangeFacebook}
                                           value="option1"/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox1">Facebook</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2"
                                           checked={this.state.youtubeChecked} onChange={this.onChangeYoutube}
                                           value="option2"/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox2">Youtube</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox3"
                                           checked={this.state.instagramChecked} onChange={this.onChangeInstagram}
                                           value="option3"/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox3"> Instagram </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox4"
                                           checked={this.state.twitchChecked} onChange={this.onChangeTwitch}
                                           value="option4"/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox4"> Twitch </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox5"
                                           checked={this.state.twitterChecked} onChange={this.onChangeTwitter}
                                           value="option5"/>
                                    <label className="form-check-label" htmlFor="inlineCheckbox5"> Twitter </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>Vitesses des commentaire <input type="number"/>com/min</div>
                    <div className="col-12">
                        <h2>Options</h2>
                        <div className="d-flex justify-content-around">
                            <div className="card">
                                <div className="card-body form-group">
                                    <div className="card-header">KeyWords</div>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="card-title">Nombre compris entre</div>
                                        <div><input type="number"/> et <input type="number"/></div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body form-group">
                                    <div className="card-header">Modèle de commentaires</div>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
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

export default Generator
