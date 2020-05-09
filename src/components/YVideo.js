import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

export default function YVideo() {

  const [time, setTime] = useState(0);

  var timer;
  const id = '8rry2jde8j0';
  function getTime(event) {
    timer = setInterval(function () {
      var time = event.target.getCurrentTime();
      var time = Math.floor(time * 100) / 100;
      setTime(time)
    }, 100);
  }
  function stopTimer() {
    clearInterval(timer);
  }
  return (
    <React.Fragment>
      <YouTube id='video' videoId={id} onPlay={getTime} onPause={stopTimer} ></YouTube>
      <div>{time}</div>
    </React.Fragment>
  )
}