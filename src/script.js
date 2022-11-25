
import ReactDOM, { render } from "https://cdn.skypack.dev/react-dom@17.0.1";
import * as mathjs from "https://cdn.skypack.dev/mathjs";
import math from "https://cdn.skypack.dev/math@0.0.3"
import React, { useState } from "https://cdn.skypack.dev/react@17.0.1";


let countDown; 
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakTime: 5,
      sessionTime: 25,
      sessionMinutes: 25,
      sessionSeconds: "00",
      timerIsOn: false,
      pause: false,
      session: "Session",
      icon: <i class="bi bi-play-circle"></i>,
    };
  }

  //increment Break Time
  incrementBreakTime = () => {
    if (this.state.breakTime < 60 && this.state.timerIsOn === false) {
      this.setState({
        breakTime: this.state.breakTime + 1,
      });
    }
  };

  //Decrement Break Time
  decrementBreakTime = () => {
    if (this.state.breakTime > 1 && this.state.timerIsOn === false) {
      this.setState({
        breakTime: this.state.breakTime - 1,
      });
    }
  };

  //Increment Session's Time
  incrementSession = () => {
    if (
      this.state.sessionTime < 60 &&
      this.state.timerIsOn === false &&
      this.state.sessionTime < 9
    ) {
      this.setState({
        sessionTime: this.state.sessionTime + 1,
        sessionMinutes: "0" + (parseInt(this.state.sessionTime) + 1),
        sessionSeconds: "00",
      });
    } else if (
      this.state.sessionTime < 60 &&
      this.state.timerIsOn === false &&
      parseInt(this.state.sessionTime) >= 9
    ) {
      this.setState({
        sessionTime: this.state.sessionTime + 1,
        sessionMinutes: parseInt(this.state.sessionTime) + 1,
        sessionSeconds: "00",
      });
    }
  };

  //Decrement Session's Time
  decrementSession = () => {
    if (
      this.state.sessionTime > 1 &&
      this.state.sessionTime > 10 &&
      this.state.timerIsOn === false
    ) {
      this.setState({
        sessionTime: this.state.sessionTime - 1,
        sessionMinutes: this.state.sessionMinutes - 1,
        sessionSeconds: "00",
      });
    } else if (this.state.sessionTime > 1 && this.state.sessionTime <= 10) {
      this.setState({
        sessionTime: this.state.sessionTime - 1,
        sessionMinutes: "0" + (this.state.sessionMinutes - 1),
        sessionSeconds: "00",
      });
    }
  };

  //Start/Stop Timer
  timer = () => {
    if (this.state.timerIsOn === false) {
      this.setState({
        timerIsOn: true,
        icon:<i class="bi bi-pause-circle"></i>
      })
      
      let seconds =
      this.state.sessionMinutes * 60 + parseInt(this.state.sessionSeconds);
      
      const now = Date.now();
      const then = now + seconds * 1000;
      
      countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(this.state.sessionMinutes === "00" && this.state.sessionSeconds === "00") {
          document.getElementById("beep").play();
        }
        // check if we should stop it!
        if (secondsLeft < 0) {
          clearInterval(countDown);
          this.break();
          return;
        }
        //display it
        this.displayTimeLeft(secondsLeft);
      }, 1000);
    } else {
      clearInterval(countDown);
      let minuteToPause = this.state.sessionMinutes;
      let secondsToPause = this.state.sessionSeconds;
      this.setState({
        timerIsOn: false,
        icon:<i class="bi bi-play-circle"></i>,
        sessionMinutes: minuteToPause,
        sessionSeconds: secondsToPause,
      });
    }
  };

  //Display the timer
  displayTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    if (remainderSeconds >= 10 && minutes >= 10) {
      this.setState({
        sessionMinutes: minutes,
        sessionSeconds: remainderSeconds,
      });
    } else if (remainderSeconds <= 9) {
      this.setState({
        sessionMinutes: "0" + minutes,
        sessionSeconds: "0" + remainderSeconds,
      });
    } else {
      this.setState({
        sessionMinutes: "0" + minutes,
        sessionSeconds: remainderSeconds,
      });
    }
  };

  //Check if time is over and the break can start
  break = () => {
    if(this.state.pause === false) {
      if(this.state.breakTime > 9){
    this.setState({
      sessionTime: "Break",
      sessionMinutes: this.state.breakTime,
      sessionSeconds: "00",
      timerIsOn: false,
      pause: true
    })
    this.timer()
  } else {
       this.setState({
         session: "Break",
         sessionMinutes: "0" + this.state.breakTime,
         sessionSeconds: "00",
         timerIsOn: false,
         pause: true,
       });
       this.timer();
  }
  } else {
    if(this.state.sessionTime > 9) {
    this.setState({
      session: "Session",
      sessionMinutes: this.state.sessionTime,
      sessionSeconds: "00",
      timerIsOn: false,
      pause: false,
    });
    this.timer();
  } else {
    this.setState({
      session: "Session",
      sessionMinutes: "0" +this.state.sessionTime,
      sessionSeconds: "00",
      timerIsOn: false,
      pause: false,
    });
    this.timer();
  }
}
  };

  //Reset Time
  resetTime = () => {
    clearInterval(countDown);
    this.setState({
      session: "Session",
      breakTime: 5,
      sessionTime: 25,
      sessionMinutes: 25,
      sessionSeconds: "00",
      timerIsOn: false,
      pause: false,
    });
    document.getElementById("beep").currentTime = 0;
    document.getElementById("beep").pause();
  };
  render(){
  
   
    return(
     <div className = "mains">
      <div id="color">L1nkStart</div>
      <div className = "main">
         <div className = "top">
          <div className = "session">
             <p id="break-label">Break Lenght</p>
             <div
                id="break-increment"
                onClick={() => this.incrementBreakTime()}
                className="boton-plus">
               <i class="bi bi-plus-lg"></i>
              </div>
            <div id="break-length">{this.state.breakTime}</div>
            <div
              id="break-decrement"
              onClick={() => this.decrementBreakTime()}
              className="boton-plus">
              <i class="bi bi-dash-lg"></i>
            </div>
          </div>
          <div>
            <div id="time-left" className="clock">
              <div id="timer-label">{this.state.session}</div>
                  <audio id="beep" src="https://www.pacdv.com/sounds/interface_sound_effects/sound5.mp3" type="audio/mp3"></audio>
                  {this.state.sessionMinutes}:{this.state.sessionSeconds}
            </div>
            <div className = "buttoms">
              <div
                id="start_stop"
                onClick={() => this.timer() }
                className="boton">
                {this.state.icon}
                </div>
              <div
                id="reset"
                onClick={() => this.resetTime() }
                className="boton">
                <i class="bi bi-arrow-repeat"></i>
               </div>
            </div>
          </div>

          <div className = "session">
             <p id="session-label">Session Lenght</p>
              <div
                id="session-increment"
                onClick={ () => this.incrementSession() }
                className="boton-plus">
               <i class="bi bi-plus-lg"></i>
              </div>
            <div id="session-length">{this.state.sessionTime}</div>
            <div
              id="session-decrement"
              onClick={() => this.decrementSession() }
              className="boton-plus">
              <i class="bi bi-dash-lg"></i>
            </div>    
          </div>    
         </div>
      </div>
    </div>
    )
  }
}
ReactDOM.render(<Clock />, document.getElementById('root'));