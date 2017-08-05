import React, {Component} from 'react';
import {connect} from 'react-redux';
import VideoRow from './videorow';
import styled from 'styled-components';

const Wrapper1 = styled.section`
	padding: 0.5em;
  background: white;
  position: relative;
  z-index: 100;
  margin-left: 19em;
  width: 35em;
  border: 0.01em solid black;
`;

const Wrapper2 = styled.section`
	padding: 0.5em;
  background: white;
  position: relative;
  z-index: 100;
  margin-left: 0.4em;
  width: 9em;
  border: 0.01em solid black;
`;

class Dropdown extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.props.page;
   }


  render() {
    var content;
    if (this.props.content) {
    content = this.props.content.slice(0, 5);
    }
    else {
      content = [];
    }

    if (this.props.page == "home") {
      return(
        <Wrapper1>
              {content.map((suggestion, index) =>
              <VideoRow key={index.toString()}
                        context={suggestion._highlightResult.alternatives[0].transcript.value}
                        timestamp={suggestion.alternatives[0].timestamps[0][1]} />
            )}
        </Wrapper1>
      )
    } else if (this.props.page == "video") {
      return (
        <Wrapper2>
          {content.map((suggestion, index) =>
          <VideoRow key={index.toString()}
                    context={suggestion._highlightResult.alternatives[0].transcript.value}
                    timestamp={suggestion.alternatives[0].timestamps[0][1]} />
        )}
        </Wrapper2>
      );
    }
  }
}

export default Dropdown;
