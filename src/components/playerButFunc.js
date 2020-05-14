//VideoFrame Button controller

const playButton = (e) => {
  e.target.playVideo();
}
const stopButton = (e) => {
  e.target.pauseVideo();
}


export { playButton, stopButton };