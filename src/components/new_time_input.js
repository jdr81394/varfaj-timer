import React, { Component } from 'react';

class NewTimeInput extends Component  {

    newTime = React.createRef();

    render() {
        return(
            <div id="newTimeInputContainer" >
                <h5> Countdown: </h5>
                <input ref={this.newTime} name="newTime" type="number" placeholder="Enter time (minutes)" min="0"/> 
                <button type="button" className="btn " onClick={(e) => this.props.newTime(this.newTime.current.value)}> Start </button>
            </div>
        )
    }
    

}

export default NewTimeInput;