import React from "react";


class HomePage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get('token'),
        }
    };


    doYouHaveCookie() {
        if (this.state.cookie) {
            console.log('Access Granted')
        } else console.log('Access Denied')
    }

    render() {
        return (
            <div>
                <h2> HomePage</h2>
                <button onClick={this.doYouHaveCookie()}> Cookie</button>
            </div>

        )
    }
}

export default HomePage
