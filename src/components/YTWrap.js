import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoFrame from './VideoFrame';
import LangSelect from './LangSelect';
import Search from './search'


export default function YTWrap() {
  const [script1, setScript1] = useState();
  const [script2, setScript2] = useState();
  const [videoId, setVideoId] = useState('');
  const [idError, setIdError] = useState(true);//idがなければTRUE
  const [lang, setLang] = useState();
  const [selectedLang1, setSelectedLang1] = useState('unselected');
  const [selectedLang2, setSelectedLang2] = useState('unselected');


  const getCaptionOpt = (id) => {
    const url = `http://video.google.com/timedtext?type=list&v=${id}`;
    axios
      .get(url)
      .then(response => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(response.data, "text/xml");//入手したxmlをパースかけて、配列にして、MAPでそれぞれのlang_codeを取得した。
        var langList = [...doc.getElementsByTagName("track")].map((track) => track.getAttribute('lang_code'));
        setLang(langList);
      })
      .catch(() => {
        console.log('スクリプト一覧取得失敗');
      });
  }

  const getScript = (lang_code) => {
    return new Promise((resolve, reject) => {
      const url = `http://video.google.com/timedtext?lang=${lang_code}&v=${videoId}`
      axios
        .get(url)
        .then(response => {
          let parser = new DOMParser();
          let scriptDoc = parser.parseFromString(response.data, "text/xml");
          var textList = [...scriptDoc.getElementsByTagName("text")].map((text, i) => {
            const start = text.getAttribute('start')
            const dur = text.getAttribute('dur')
            const caption = text.innerHTML
            return { start: start, dur: dur, caption: caption }
          }
          );
          // console.log(response.data)
          resolve(textList)
        })
      // .catch(() => {
      //   console.log('通信に失敗しました');
      // });
    })
  }

  const handleLang = (e) => {

    const no = e.currentTarget.getAttribute('lang-no')
    const selectedLang = e.target.value;

    switch (no) {
      case '1':
        getScript(selectedLang).then(
          (result) => {
            setScript1(result)
            console.log(result)
          }
        )
        break;
      case '2':
        getScript(selectedLang).then(
          (result) => {
            setScript2(result)
            console.log(result)
          }
        )
        break;
    }
  }

  const getVideoId = (url) => {//Get VIDEO ID from SEARCH component 
    try {
      //エラー出るかもしれないけど実行したい処理  
      var seperateURL = url.split('v=')[1].split('&')[0];
      setVideoId(seperateURL);
      getCaptionOpt(seperateURL);
      setIdError(false);
    } catch (e) {
      //エラーが出たときの処理  
      setVideoId('YoutubeのURLを貼り付けてください');
      setIdError(true);
    }
  }

  const Script = () => {
    return (
      <div>
        --------------------
        ----------------------
      </div>
    )
  }



  const t = () => {

    var i = 1;
    const ttt = () => {
      return new Promise((resolve, reject) => {
        i += 1
        console.log('in ; ' + i)
        resolve(i)
      })
    }
    ttt().then(
      (result) => {
        console.log('then' + (result + 1))
      }
    )
  }



  return (
    <React.Fragment>
      <div id='seearch'>search</div>
      <Search getVideoId={getVideoId}></Search>
      {lang !== undefined &&
        <LangSelect amount='2' onChange={handleLang} langOpt={lang}></LangSelect>
      }
      <VideoFrame script1={script1} script2={script2} videoId={videoId} isIdError={idError}>{videoId}</VideoFrame>
      <Script></Script>
      <button onClick={t}>aaa</button>
    </React.Fragment>
  )
}

