import React from "react";

class Generator extends React.Component {

    delete(id) {
        this.props.delete(id);
        console.log(this.props)
    }
    update(id){
    this.props.update(id)
    }


    render() {
        return (
            this.props.array.map(generator =>
                <li className="card" key={generator._id}>
                    <div className=" d-flex">
                        <h2 className="card-header col-2">{generator.name} - {generator._id}</h2>
                        <div className="col-1">{generator.socialNetworks.join('\n')}</div>
                        <div
                            className="col-6 d-flex justify-content-center align-items-center">{generator.keywords.join('\n')}</div>
                        <div className="col-1">Interval : {generator.minNumber} - {generator.maxNumber}</div>
                        <div className="col-1"> Modèle : {generator.generatorModel}</div>
                        <button className="btn btn-danger col-1" onClick={() => this.delete(generator._id)}>Delete
                        </button>
                        <button className="btn btn-primary col-1" onClick={() => this.update(generator._id)}>Update
                        </button>
                    </div>
                </li>
            )
        );
    }

}
export default Generator
