import React, {Component} from 'react';
import {connect} from 'react-redux';
import VideoRow from './videorow';
import styled from 'styled-components';

const Wrapper = styled.section`
	padding: 0.5em;
  background: white;
  position: relative;
  z-index: 100;
  margin-left: 19em;
  width: 35em;
  border: 0.01em solid black;
`;

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {videos: [
      {timestamp: 10.10, 'context': 'this is some context'},
      {timestamp: 2000.30, 'context': 'this is another context'}
    ]};

   }


  componentDidMount() {
    console.log('yay it mounted')
  }


  render() {
    var videos = this.state.videos;
    return (
      <div>
        <Wrapper>
          {videos.map((video, index) =>
            // Correct! Key should be specified inside the array.
            <VideoRow key={index.toString()} video={video} />
          )}
        </Wrapper>
      </div>
    );
  }
}

export default Dropdown;
