import React, {Component} from 'react';
import {connect} from 'react-redux';

class VideoRow extends Component {
  constructor(props) {
    super(props);
    console.log(props.video.timestamp);
    this.skipToTime = this.skipToTime.bind(this);
   }

  skipToTime() {
    console.log('waws called')
    document.getElementsByTagName('video')[0].currentTime = this.props.video.timestamp;
    document.getElementsByTagName('video')[1].currentTime = this.props.video.timestamp;
    const progressbar = document.getElementsByClassName('timeline')[0].getElementsByClassName('timeline-bg')[0].getElementsByClassName('progress')[0];
    progressbar.style = "width:" + this.props.video.timestamp/33.6 + "%";
  }

  render() {
    return (
      <div onClick={this.skipToTime}>
        <div>{this.props.video.timestamp}</div>
        <div>{this.props.video.context}</div>
      </div>
    );
  }
}


export default VideoRow;
