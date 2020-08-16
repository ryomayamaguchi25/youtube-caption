import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoFrame from './VideoFrame';
import LangSelect from './LangSelect';
import Search from './search'
import Alert from '@material-ui/lab/Alert';



export default function YTWrap() {
  const [script1, setScript1] = useState();
  const [script2, setScript2] = useState();
  const [videoId, setVideoId] = useState();
  const [idError, setIdError] = useState();//idがなければTRUE
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
            console.log(textList)
            const start = text.getAttribute('start')
            const dur = text.getAttribute('dur')
            const caption = text.textContent.replace(/(&lt;)/g, '<').replace(/(&gt;)/g, '>').replace(/(&quot;)/g, '"').replace(/(&#39;)/g, "'").replace(/(&amp;)/g, '&');
            return { start: start, dur: dur, caption: caption }
          }
          );
          console.log(response.data)
          resolve(textList)
        })
      // .catch(() => {
      //   console.log('通信に失敗しました');
      // });
    })
  }

  const handleLang = (no, e) => {
    // no = no + 1
    const selectedLang = e.target.value
    switch (no) {
      case 1:
        getScript(selectedLang).then(
          (result) => {
            setScript1(result)
            console.log(result)
          }
        )
        break;
      case 2:
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
      // url = 'https://www.youtube.com/watch?v=_F7iIkHF4u8'
      url = url;
      var seperateURL = url.split('v=')[1].split('&')[0];
      setVideoId(seperateURL);
      getCaptionOpt(seperateURL);
      setIdError(false);
    } catch (e) {
      console.log('error');
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
      {idError && (
        <Alert severity="warning">{videoId}</Alert>
      )}
      {/* <div id='seearch'>search</div> */}
      <Search getVideoId={getVideoId}></Search>
      {lang !== undefined &&
        <LangSelect amount='2' onChange={handleLang} langOpt={lang}></LangSelect>
      }
      <VideoFrame script1={script1} script2={script2} videoId={videoId} isIdError={idError}>


      </VideoFrame>
      <Script></Script>
      <button onClick={t}>aaa</button>
    </React.Fragment>
  )
}

