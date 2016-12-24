import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      interval: null,
      offset: null,
      isOn: false,
      displayTime: '00:00:00'
    }
  }

  updateTime = () => {
    //console.log('test')
    this.setState({
      time: this.state.time + this.delta()
    })

    let formattedTime = this.formatTime()
    console.log(formattedTime)
    this.setState({
      displayTime: formattedTime
    })
  }

  delta = () => {
    let now = Date.now()
    let timePassed = now - this.state.offset
    this.setState({
      offset: now
    })
    return timePassed
  }

  formatTime = () => {
    let time = new Date(this.state.time)
    let minutes = time.getMinutes().toString()
    let seconds = time.getSeconds().toString()
    let milliseconds = time.getMilliseconds().toString()

    if(minutes.length < 2) {
      minutes = '0' + minutes
    } 

    if(seconds.length < 2 ) {
      seconds = '0' + seconds
    } 

    while(milliseconds.length  < 3) {
      milliseconds = '0' + milliseconds
    }

    return minutes + ':' + seconds + ':' + milliseconds
  }


  startTimer = () => {
    console.log('started')
    if(!this.state.isOn) {
      this.setState({
        interval: setInterval(this.updateTime, 10),
        offset: Date.now(),
        isOn: true,
      })
    }
  }

  pauseTimer = () => {
    console.log('stopped')
    if(this.state.isOn) {
      clearInterval(this.state.interval)
      this.setState({
        interval: null,
        isOn: false
      })
    }
  }

  reset = () => {
    if(!this.state.isOn) {
      this.setState({
        time: 0,
        displayTime: '00:00:00'
      })
    }
  }
  
  render = () => {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>REACT TIMER</h2>
        </div>
          <div className="timer"> 
            <h1> {this.state.displayTime} </h1>
              <button type="button" onClick={this.startTimer}>START</button>
              <button type="button" onClick={this.pauseTimer}>STOP</button>
              <button type="button" onClick={this.reset}>RESET</button>
          </div>
      </div>
    );
  }
}

export default App;
