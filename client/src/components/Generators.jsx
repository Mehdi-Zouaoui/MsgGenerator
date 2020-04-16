import React from 'react';

class Generators extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            generatorsArray : []
        }
    };
    render(){
        return(
            <div> Generators Liste </div>
        );
    }
}
export default Generators;
