import React, {Component} from 'react';
import './App.css';
import NewTimeInput from "./components/new_time_input";
import PauseResumeButton from "./components/pause_resume_button";
import DurationText from "./stateless_components/duration_txt";

class App extends Component {

  state = {
    totalTime: 0,
    minutes: 0,
    seconds: 0,
    running: true,
    intervalRate: 1000,
    halfway: false,
    transparent: false,
    timerColor: "black",
    timerText: ""
  };

  /* Use countdown as the interval */
  countDown;

  newTime = (newTime) => {

    let decimal = newTime - Math.floor(newTime);
    let seconds = Math.round(decimal * 60);
    let minutes = Math.floor(newTime);

    this.setState({
      minutes, seconds, timerColor: "black", timerText: ""
    }, () => {
        /* After minutes and seconds are set, Use this variable for detecting pop up text */
        let totalTime = this.state.minutes * 60 + this.state.seconds;
        this.setState({
          totalTime
        });

    });

    clearInterval(this.countDown);
    this.countDown = setInterval(this.decrementTime, this.state.intervalRate); 
  }

  mutateRunTime = () => {
   this.setState({
     running: !this.state.running
   })
  }

  mutateSpeed = (intervalRate) => {
    /* After interval rate is set, clear possible previous countdown and set new interval */
    this.setState({
      intervalRate
    }, () => {
      clearInterval(this.countDown);
      /* Only start countdown if there is a current value being decremented */
      if(this.state.seconds > 0) {
        this.countDown = setInterval(this.decrementTime, this.state.intervalRate);
      }
    });
  }


  decrementTime = () => {
    /* Only decrement time while the timer is running */
    if(this.state.running) {
      if (this.state.seconds === 0 && this.state.minutes !== 0) {
        this.setState({
          minutes: this.state.minutes - 1, seconds: 59
        });
      } else if(this.state.seconds !== 0) {
        this.setState({
          seconds: this.state.seconds - 1
        });
      }
    }
    
    /* Call determine duration for possible text popups */
    this.determineDurationLeft();
  }

  determineDurationLeft = () => {

    let timeLeft = (this.state.minutes * 60) + this.state.seconds;
    console.log("time left: " , timeLeft, " and total time: " , this.state.totalTime);
    if(timeLeft === 0) {
      this.setState({
        timerText: "Time's Up!"
      })
    }
    else if (timeLeft * 2 <= this.state.totalTime) {
      console.log("in here");
      this.setState({
        timerText: "More than halfway there!"
      })
    } 
    
    if(timeLeft <= 20) {
      this.setState({
        timerColor: "red"
      })
    } else {
      this.setState({
        timerColor: "black"
      })
    }

    if (timeLeft <= 10 ) {
      this.setState({
        transparent: !this.state.transparent
      })
    } else {
      this.setState({
        transparent: false,
      })
    }

  }

  render() {
    return(
      
      <div className="jumbotron m-5 ">
        <NewTimeInput newTime={(newTime) => this.newTime(newTime)} time ={this.time}></NewTimeInput>
        <DurationText text={this.state.timerText}></DurationText>
        <h1 style={{ width: "30%", margin: "auto", textAlign: "center",  alignSelf: "center", color: this.state.timerColor, 
        opacity: this.state.transparent ? ".25" : "1"
        }}> {this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</h1>
        <PauseResumeButton mutateSpeed={(speed) => this.mutateSpeed(speed)} mutateRunTime={() => this.mutateRunTime()} running={this.state.running}></PauseResumeButton>
      </div>
    ) 
  }

}

export default App;

