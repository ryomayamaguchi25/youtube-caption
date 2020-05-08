import React from 'react';
import axios from 'axios';


// IFrame Player API の読み込み
// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  // ytPlayer = new YT.Player(
  //   'sample', // 埋め込む場所の指定
  //   {
  //     width: 640, // プレーヤーの幅
  //     height: 390, // プレーヤーの高さ
  //     videoId: 'bHQqvYy5KYo' // YouTubeのID
  //   }
  // );
  console.log('load');
};
// YouTubeの埋め込み


export default function YVideo() {
  return (
    <div id='sample'>
      <script src="https://www.youtube.com/player_api"></script>
    </div>
  )
}