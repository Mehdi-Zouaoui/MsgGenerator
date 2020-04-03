import React from "react";


class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1 className="my-5">Cliclic Message Generator</h1>
                {/*<button onClick={this.doYouHaveCookie()}> Cookie</button>*/}
                //FORMULAIRE DE CREATION DE GENERATEUR
                <form>
                    <label>
                        Nom :
                        <input type="text" name="name" />
                    </label>
                    <input type="submit" value="Envoyer" />
                </form>
            </div>

        )
    }
}

export default HomePage
