import React, {Component} from 'react';
import {connect} from 'react-redux';

class VideoRow extends Component {
  constructor(props) {
    super(props);
    this.skipToTime = this.skipToTime.bind(this);
    this.thumbnailUrl = document.getElementsByTagName('video')[0].src.split("hd1")[0] + "thumbnails1/" + Math.round(props.timestamp/60) * 60 + ".jpg"; 
   }

  skipToTime() {
    document.getElementsByTagName('video')[0].currentTime = this.props.timestamp;
    if (document.getElementsByTagName('video')[1])  document.getElementsByTagName('video')[1].currentTime = this.props.timestamp;
    const progressbar = document.getElementsByClassName('timeline')[0].getElementsByClassName('timeline-bg')[0].getElementsByClassName('progress')[0];
    progressbar.style = "width:" + this.props.timestamp/33.6 + "%";
  }

  render() {
    return (
      <div onClick={this.skipToTime}>
        <div>{this.props.timestamp}</div>
        <div dangerouslySetInnerHTML={{__html: this.props.context}}></div>
        <img src={this.thumbnailUrl} />
      </div>
    );
  }
}


export default VideoRow;
