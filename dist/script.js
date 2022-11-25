function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
import ReactDOM, { render } from "https://cdn.skypack.dev/react-dom@17.0.1";
import * as mathjs from "https://cdn.skypack.dev/mathjs";
import math from "https://cdn.skypack.dev/math@0.0.3";
import React, { useState } from "https://cdn.skypack.dev/react@17.0.1";


let countDown;
class Clock extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "incrementBreakTime",













    () => {
      if (this.state.breakTime < 60 && this.state.timerIsOn === false) {
        this.setState({
          breakTime: this.state.breakTime + 1 });

      }
    });_defineProperty(this, "decrementBreakTime",


    () => {
      if (this.state.breakTime > 1 && this.state.timerIsOn === false) {
        this.setState({
          breakTime: this.state.breakTime - 1 });

      }
    });_defineProperty(this, "incrementSession",


    () => {
      if (
      this.state.sessionTime < 60 &&
      this.state.timerIsOn === false &&
      this.state.sessionTime < 9)
      {
        this.setState({
          sessionTime: this.state.sessionTime + 1,
          sessionMinutes: "0" + (parseInt(this.state.sessionTime) + 1),
          sessionSeconds: "00" });

      } else if (
      this.state.sessionTime < 60 &&
      this.state.timerIsOn === false &&
      parseInt(this.state.sessionTime) >= 9)
      {
        this.setState({
          sessionTime: this.state.sessionTime + 1,
          sessionMinutes: parseInt(this.state.sessionTime) + 1,
          sessionSeconds: "00" });

      }
    });_defineProperty(this, "decrementSession",


    () => {
      if (
      this.state.sessionTime > 1 &&
      this.state.sessionTime > 10 &&
      this.state.timerIsOn === false)
      {
        this.setState({
          sessionTime: this.state.sessionTime - 1,
          sessionMinutes: this.state.sessionMinutes - 1,
          sessionSeconds: "00" });

      } else if (this.state.sessionTime > 1 && this.state.sessionTime <= 10) {
        this.setState({
          sessionTime: this.state.sessionTime - 1,
          sessionMinutes: "0" + (this.state.sessionMinutes - 1),
          sessionSeconds: "00" });

      }
    });_defineProperty(this, "timer",


    () => {
      if (this.state.timerIsOn === false) {
        this.setState({
          timerIsOn: true,
          icon: /*#__PURE__*/React.createElement("i", { class: "bi bi-pause-circle" }) });


        let seconds =
        this.state.sessionMinutes * 60 + parseInt(this.state.sessionSeconds);

        const now = Date.now();
        const then = now + seconds * 1000;

        countDown = setInterval(() => {
          const secondsLeft = Math.round((then - Date.now()) / 1000);
          if (this.state.sessionMinutes === "00" && this.state.sessionSeconds === "00") {
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
          icon: /*#__PURE__*/React.createElement("i", { class: "bi bi-play-circle" }),
          sessionMinutes: minuteToPause,
          sessionSeconds: secondsToPause });

      }
    });_defineProperty(this, "displayTimeLeft",


    seconds => {
      const minutes = Math.floor(seconds / 60);
      const remainderSeconds = seconds % 60;
      if (remainderSeconds >= 10 && minutes >= 10) {
        this.setState({
          sessionMinutes: minutes,
          sessionSeconds: remainderSeconds });

      } else if (remainderSeconds <= 9) {
        this.setState({
          sessionMinutes: "0" + minutes,
          sessionSeconds: "0" + remainderSeconds });

      } else {
        this.setState({
          sessionMinutes: "0" + minutes,
          sessionSeconds: remainderSeconds });

      }
    });_defineProperty(this, "break",


    () => {
      if (this.state.pause === false) {
        if (this.state.breakTime > 9) {
          this.setState({
            sessionTime: "Break",
            sessionMinutes: this.state.breakTime,
            sessionSeconds: "00",
            timerIsOn: false,
            pause: true });

          this.timer();
        } else {
          this.setState({
            session: "Break",
            sessionMinutes: "0" + this.state.breakTime,
            sessionSeconds: "00",
            timerIsOn: false,
            pause: true });

          this.timer();
        }
      } else {
        if (this.state.sessionTime > 9) {
          this.setState({
            session: "Session",
            sessionMinutes: this.state.sessionTime,
            sessionSeconds: "00",
            timerIsOn: false,
            pause: false });

          this.timer();
        } else {
          this.setState({
            session: "Session",
            sessionMinutes: "0" + this.state.sessionTime,
            sessionSeconds: "00",
            timerIsOn: false,
            pause: false });

          this.timer();
        }
      }
    });_defineProperty(this, "resetTime",


    () => {
      clearInterval(countDown);
      this.setState({
        session: "Session",
        breakTime: 5,
        sessionTime: 25,
        sessionMinutes: 25,
        sessionSeconds: "00",
        timerIsOn: false,
        pause: false });

      document.getElementById("beep").currentTime = 0;
      document.getElementById("beep").pause();
    });this.state = { breakTime: 5, sessionTime: 25, sessionMinutes: 25, sessionSeconds: "00", timerIsOn: false, pause: false, session: "Session", icon: /*#__PURE__*/React.createElement("i", { class: "bi bi-play-circle" }) };} //increment Break Time
  render() {


    return /*#__PURE__*/(
      React.createElement("div", { className: "mains" }, /*#__PURE__*/
      React.createElement("div", { id: "color" }, "L1nkStart"), /*#__PURE__*/
      React.createElement("div", { className: "main" }, /*#__PURE__*/
      React.createElement("div", { className: "top" }, /*#__PURE__*/
      React.createElement("div", { className: "session" }, /*#__PURE__*/
      React.createElement("p", { id: "break-label" }, "Break Lenght"), /*#__PURE__*/
      React.createElement("div", {
        id: "break-increment",
        onClick: () => this.incrementBreakTime(),
        className: "boton-plus" }, /*#__PURE__*/
      React.createElement("i", { class: "bi bi-plus-lg" })), /*#__PURE__*/

      React.createElement("div", { id: "break-length" }, this.state.breakTime), /*#__PURE__*/
      React.createElement("div", {
        id: "break-decrement",
        onClick: () => this.decrementBreakTime(),
        className: "boton-plus" }, /*#__PURE__*/
      React.createElement("i", { class: "bi bi-dash-lg" }))), /*#__PURE__*/


      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "time-left", className: "clock" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, this.state.session), /*#__PURE__*/
      React.createElement("audio", { id: "beep", src: "https://www.pacdv.com/sounds/interface_sound_effects/sound5.mp3", type: "audio/mp3" }),
      this.state.sessionMinutes, ":", this.state.sessionSeconds), /*#__PURE__*/

      React.createElement("div", { className: "buttoms" }, /*#__PURE__*/
      React.createElement("div", {
        id: "start_stop",
        onClick: () => this.timer(),
        className: "boton" },
      this.state.icon), /*#__PURE__*/

      React.createElement("div", {
        id: "reset",
        onClick: () => this.resetTime(),
        className: "boton" }, /*#__PURE__*/
      React.createElement("i", { class: "bi bi-arrow-repeat" })))), /*#__PURE__*/




      React.createElement("div", { className: "session" }, /*#__PURE__*/
      React.createElement("p", { id: "session-label" }, "Session Lenght"), /*#__PURE__*/
      React.createElement("div", {
        id: "session-increment",
        onClick: () => this.incrementSession(),
        className: "boton-plus" }, /*#__PURE__*/
      React.createElement("i", { class: "bi bi-plus-lg" })), /*#__PURE__*/

      React.createElement("div", { id: "session-length" }, this.state.sessionTime), /*#__PURE__*/
      React.createElement("div", {
        id: "session-decrement",
        onClick: () => this.decrementSession(),
        className: "boton-plus" }, /*#__PURE__*/
      React.createElement("i", { class: "bi bi-dash-lg" })))))));






  }}

ReactDOM.render( /*#__PURE__*/React.createElement(Clock, null), document.getElementById('root'));