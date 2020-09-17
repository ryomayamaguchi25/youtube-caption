import React, { useRef, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import Subtitles from './Subtitles';
import { playButton, stopButton } from './playerButFunc'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import Forward5Icon from '@material-ui/icons/Forward5';
import Forward10Icon from '@material-ui/icons/Forward10';
import Forward30Icon from '@material-ui/icons/Forward30';
import Replay5Icon from '@material-ui/icons/Replay5';
import Replay10Icon from '@material-ui/icons/Replay10';
import Replay30Icon from '@material-ui/icons/Replay30';


export default function VideoFrame(props) {
  const id = props.videoId;
  const script1 = props.script1;
  const script2 = props.script2;
  const isError = props.isIdError;
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
    setTime(newTime)
  }
  const playBackBtnTest = (sec) => {
    let newTime = (time - sec)
    if (newTime < 0) {
      newTime = 0
    }
    this.event.target.seekTo(newTime);
    setTime(newTime)
  }
  const playForwardBtn = (sec) => {
    const newTime = time + sec
    event.target.seekTo(newTime);
    // const getOriginal = event.target.getCurrentTime();
    setTime(newTime)
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
  const playerContent = () => {
    return (
      <Box display='flex' alignItems='center' flexDirection='column'>
        <YouTube id='video' videoId={id} onStateChange={getTime} onReady={_onReady} ></YouTube>
        {/* VideoID:{id} */}
        {/* {time} */}

        {!(event == null) &&
          <PlayContBtn event={event} isPlay={isPlay} playForwardBtn={playForwardBtn} playBackBtn={playBackBtn}></PlayContBtn>
        }
        <Subtitles subtitle1={displayText1} subtitle2={displayText2}></Subtitles>
      </Box>
    )
  }

  // const Test = () => {
  //   return (
  //     <div>
  //       aaaa
  //     </div>
  //   )
  // };
  return (
    <React.Fragment>
      {(props.isIdError == false) && (
        playerContent()
      )}

    </React.Fragment>
  )
}



const PlayContBtn = (props) => {
  return (
    <div>
      <Tooltip title='-30sec'>
        <Button onClick={() => props.playBackBtn(30)}>
          <Replay30Icon fontSize="large" />
        </Button>
      </Tooltip>
      <Tooltip title='-10sec'>
        <Button onClick={() => props.playBackBtn(10)}>
          <Replay10Icon fontSize="large" />

        </Button>
      </Tooltip>
      <Tooltip title='-5sec'>
        <Button onClick={() => props.playBackBtn(5)}>
          <Replay5Icon fontSize="large" />
        </Button>
      </Tooltip>

      {props.isPlay.current ?
        <Button onClick={() => stopButton(props.event)}>STOP</Button>

        :

        <Button onClick={() => playButton(props.event)}>PLAY</Button>}


      <Tooltip title='+5sec'>
        <Button onClick={() => props.playForwardBtn(5)}>
          <Forward5Icon fontSize="large"></Forward5Icon>
        </Button>
      </Tooltip>
      <Tooltip title='+10sec'>
        <Button onClick={() => props.playForwardBtn(10)}>
          <Forward10Icon fontSize="large"></Forward10Icon>

        </Button>
      </Tooltip>
      <Tooltip title='+30sec'>
        <Button onClick={() => props.playForwardBtn(30)}>
          <Forward30Icon fontSize="large"></Forward30Icon>

        </Button>
      </Tooltip>





    </div>
  )
}