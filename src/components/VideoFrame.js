import React, { useRef, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { playButton, stopButton } from './playerButFunc'

export default function VideoFrame(props) {
  const id = props.videoId;
  const script1 = props.script1;
  const script2 = props.script2;
  const [time, setTime] = useState(0);
  const scriptExist = script1 && script2 ? true : false;
  const [displayText1, setDisplayText1] = useState('Lamguage1');
  const [displayText2, setDisplayText2] = useState('Language2');
  const [script1Index, setScript1Index] = useState(0);
  const [script2Index, setScript2Index] = useState(0);
  const [event, setEvent] = useState(null);
  const isPlay = useRef(false);
  var timer
  const getTime = useCallback(
    (event) => {
      console.log('STATE CHANGE=======')
      if (event.target.getPlayerState() == 1) {
        isPlay.current = true
      } else {
        isPlay.current = false
      }
      const coreFunc = () => {
        var time = event.target.getCurrentTime();
        var time = Math.floor(time * 100) / 100;
        if (isPlay.current) {
          setTime(time)
          timer = setTimeout(coreFunc, 100);
        } else {
          clearTimeout(timer)
          setTime(time)
        }
      }
      console.log('getTime')
      coreFunc();
    }, []);
  const getScript1 = (time) => {
    if (script1) {
      const scriptLength = script1.length
      for (var i = script1Index; i < scriptLength; i++) {
        const start = parseFloat(script1[i].start);
        const end = start + parseFloat(script1[i].dur);
        if (start <= time && time < end) {
          const caption = script1[i].caption;
          setDisplayText1(caption)
          // setScript1Index(i + 1)
          break
        }
      }
    }
  };
  const getScript2 = (time) => {
    if (script2) {
      const scriptLength = script2.length
      for (var i = script2Index; i < scriptLength; i++) {
        const start = parseFloat(script2[i].start);
        const end = start + parseFloat(script2[i].dur);
        if (start <= time && time < end) {
          const caption = script2[i].caption;
          setDisplayText2(caption)
          // setScript1Index(i + 1)
          break
        }
      }
    }
  };
  const _onReady = (event) => {
    setEvent(event);
  }
  useEffect(
    () => {
      getScript1(time)
      getScript2(time)
    }
    , [time])

  const playBackBtn = (sec) => {
    let newTime = (time - sec)
    if (newTime < 0) {
      newTime = 0
    }
    event.target.seekTo(newTime);
    // const getOriginal = event.target.getCurrentTime();
    setTime(newTime)
  }
  const playForwardBtn = (sec) => {
    const newTime = time + sec
    event.target.seekTo(newTime);
    // const getOriginal = event.target.getCurrentTime();
    setTime(newTime)
  }


  const PlayContBtn = () => {
    return (
      <div>
        <button onClick={() => playBackBtn(15)}>＜＜＜　</button>
        <button onClick={() => playBackBtn(10)}>＜＜　</button>
        <button onClick={() => playBackBtn(5)}>＜</button>
        {isPlay.current ?
          <button onClick={() => stopButton(event)}>停止</button> :
          <button onClick={() => playButton(event)}>再生</button>}
        <button onClick={() => playForwardBtn(5)}>＞</button>
        <button onClick={() => playForwardBtn(10)}>＞＞　</button>
        <button onClick={() => playForwardBtn(15)}>＞＞＞　</button>
      </div>
    )
  }

  // useEffect(() => {
  //   const handleKeydown = (e) => {
  //     console.log('down')
  //     console.log('DOWNNNNN ; ' + time)
  //     if (event == null) { return }
  //     if (e.keyCode == 32) {
  //       if (isPlay.current == true) {
  //         console.log('I will stop')
  //         event.target.pauseVideo()
  //         return
  //       } else {
  //         console.log('I will start')
  //         event.target.playVideo()
  //         return
  //       }
  //     }
  //     if (e.keyCode == 37) {
  //       console.log('BACKKKKKKKK ; ' + time)

  //       playBackBtn(5)
  //     }
  //     if (e.keyCode == 39) {
  //       playForwardBtn(5)
  //     }
  //   }
  // }, [])
  // window.addEventListener("keydown", handleKeydown)



  return (
    <React.Fragment>
      <div>{id}</div>
      {!props.isIdError && (
        <YouTube id='video' videoId={id} onStateChange={getTime} onReady={_onReady} ></YouTube>
      )}
      {time}
      {!(event == null) &&
        <PlayContBtn></PlayContBtn>
      }
      <div>{displayText1}</div>
      <div>{displayText2}</div>
    </React.Fragment>
  )
}