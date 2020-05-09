import React, { useState } from 'react';
import axios from 'axios';
import YVideo from './YVideo';
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;


export default function YTWrap() {
  const [video, setVideo] = useState([]);
  const [videoId, setVideoId] = useState(['']);

  const getVideo=()=>{
    // const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${this.state.keyword}&maxResults=3&key=${YOUTUBE_API_KEY}`;
    // const url = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=8rry2jde8j0&key=${YOUTUBE_API_KEY}`;
    const url = ` http://video.google.com/timedtext?lang=en&v=8rry2jde8j0`;
    axios
      .get(url)
      .then(response => {
        this.setState({
          videos: response.data,
        });
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  }
}

export default class App extends React.Component {
  state = {
    videos: [],
    keyword: 'Create-React-APP'
  }
  componentDidMount() {
    // const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${this.state.keyword}&maxResults=3&key=${YOUTUBE_API_KEY}`;
    // const url = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=8rry2jde8j0&key=${YOUTUBE_API_KEY}`;
    const url = ` http://video.google.com/timedtext?lang=en&v=8rry2jde8j0`;
    axios
      .get(url)
      .then(response => {
        this.setState({
          videos: response.data,
        });
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  }
  render() {
    return (
      <div>
        <YVideo></YVideo>
        <div id='script'>{this.state.videos}</div>
      </div>
    )
  }
}