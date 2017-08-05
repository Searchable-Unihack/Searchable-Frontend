import React, {Component} from 'react';
import {connect} from 'react-redux';

class VideoRow extends Component {
  constructor(props) {
    super(props);
    console.log(props)
   }

  skipToTime() {
    document.getElementsByTagName('video')[0].currentTime = this.state.value;
    document.getElementsByTagName('video')[1].currentTime = this.state.value;
  }

  render() {
    return (
      <div>
        <div>{this.props.video.timestamp}</div>
        <div>{this.props.video.context}</div>
      </div>
    );
  }
}


export default VideoRow;
