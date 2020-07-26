import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPause,
    faPlay
  } from "@fortawesome/free-solid-svg-icons";

class PauseResumeButton extends Component {
    state = {  }

    render() { 
        return ( 
            <div id="parentButtonContainer">
                <button style={{borderRadius: "25px", backgroundColor: "rgb(200,240,240)" ,borderColor: "black"}} onClick={this.props.mutateRunTime} type="button" className="btn">{this.props.running ? 
                <FontAwesomeIcon icon={faPause}></FontAwesomeIcon>: 
                <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon> }</button>
                <div id="speedButtonContainer">
                    <button onClick={()=> this.props.mutateSpeed(1000)} type="button" className="btn"> 1x</button>
                    <button onClick={()=> this.props.mutateSpeed(666)} type="button" className="btn"> 1.5x</button>
                    <button onClick={()=> this.props.mutateSpeed(500)} type="button" className="btn"> 2x</button>
                </div>
            </div>
            
         );
    }
}
 
export default PauseResumeButton;

