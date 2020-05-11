import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

export default function VideoFrame(props) {
  const id = props.videoId;
  const script1 = props.script1;
  const script2 = props.script2;
  const [time, setTime] = useState(0);
  const scriptExist = script1 && script2 ? true : false;
  const [displayText1, setDisplayText1] = useState('iii')

  var timer;

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

  // const displayScript1 = () => {
  //   setDisplayText1('aaa')
  //   console.log('in function : ' + displayText1)
  // }

  return (
    <React.Fragment>
      {/* {console.log('a')} */}
      <div>{id}</div>
      {!props.isIdError && (
        <YouTube id='video' videoId={id} onPlay={getTime} onPause={stopTimer} ></YouTube>
      )}
      <div>{time}</div>
      <div>
        {/* {displayText1} */}
      </div>
    </React.Fragment>
  )
}