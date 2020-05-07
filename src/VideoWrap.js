import React from 'react';
import YouTube from 'react-youtube';

class Example extends React.Component {
    // onPlayerStateChange() {
    //     console.log('hahaha');
    // }
    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                cc_lang_pref: 'ja',
            },
        };

        return (
            <React.Fragment>
                <YouTube videoId="_F7iIkHF4u8" opts={opts} onStateChange={event => { console.log(event.target.getCurrentTime()) }} onReady={this._onReady} />;
                <YouTube videoId="_F7iIkHF4u8" opts={opts} onStateChange={event => { console.log(event.target.getCurrentTime()) }} onReady={this._onReady} />;
            </React.Fragment>
        )
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
}

export default function test() {
    return (
        <Example></Example>
        // console.log('2')
    )
}