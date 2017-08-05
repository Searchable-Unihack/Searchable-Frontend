import React, {Component} from 'react';
import {connect} from 'react-redux';
import VideoRow from './videorow'
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {videos: [
      {timestamp: '10.10', 'context': 'this is some context'},
      {timestamp: "12.30", 'context': 'this is another context'}
    ]};

   }


  componentDidMount() {
    console.log('yay it mounted')
  }


  render() {
    const divStyle = {
      position: 'absolute',
      display: 'float',
      backgroundColor: 'white',
      zIndex: 100
    };
    var videos = this.state.videos;
    return (
      <div style={divStyle}>
        <div>Another Test</div>
        {videos.map((video, index) =>
         // Correct! Key should be specified inside the array.
         <VideoRow key={index.toString()}
                   video={video} />
       )}
      </div>
    );
  }
}

export default Dropdown;
