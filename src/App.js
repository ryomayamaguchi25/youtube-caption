import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import IconButton from '@material-ui/core/IconButton';
import PageviewIcon from '@material-ui/icons/Pageview';
import VideoWrap from './VideoWrap';
import test from './VideoWrap';

function App() {
  return (
    <div>
      {test()}
      <div id='player'></div>
    </div>
  );
}
export default App;
