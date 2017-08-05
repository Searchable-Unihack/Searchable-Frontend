import React, { Component } from 'react';
import VideoRow from './videorow';
import styled from 'styled-components';

const WrapperHome = styled.section`
	padding: 5px;
  background: #eef1f5;
  position: fixed;
  z-index: 100;
  width: 503px;
  margin-top: -7px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 500px;
  margin-left: 219px;
  font-size: 12px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.49);
`;

const WrapperVideo = styled.section`
	padding: 5px;
  background: #eef1f5;
  position: fixed;
  z-index: 100;
  width: 500px;
  margin-top: -8px;
  margin-left: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 500px;
  font-size: 12px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.49);
`;

const divStyle = {
  fontWeight: 'bold',
  borderBottom: 'solid 1px #000',
  marginBottom: '8px',
  fontSize: 18
}

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.props.page;
  }


  render() {
    var contentAllLectures;
    if (this.props.page == "home") {
      if (this.props.content) {
        contentAllLectures = this.props.content.slice(0, 8);
      }
      else {
        contentAllLectures = [];
      }
      return (
        <WrapperHome>
          {contentAllLectures.map((suggestion, index) =>
            <VideoRow key={index.toString()}
              id={suggestion.id}
              context={suggestion._highlightResult.text.value}
              timestamp={suggestion.time}
              page={this.props.page}
              source={suggestion.source} />
          )}
        </WrapperHome>
      )
    } else if (this.props.page == "video") {
      var contentCurrentLecture;
      var curr_id = document.getElementsByTagName('video')[0].src.split("hd1")[0].split("/")[4]
      if (this.props.content) {
        contentCurrentLecture = this.props.content.filter((suggestion, index) => {
          return suggestion.id == curr_id;
        }).slice(0, 4);
        contentAllLectures = this.props.content.filter((suggestion, index) => {
          return suggestion.id != curr_id;
        }).slice(0, 3);
      }
      else {
        contentCurrentLecture = [];
        contentAllLectures = [];
      }
      return (
        <WrapperVideo>
          {contentCurrentLecture.map((suggestion, index) =>
            <VideoRow key={index.toString()}
              id={suggestion.id}
              context={suggestion._highlightResult.text.value}
              timestamp={suggestion.time}
              page={this.props.page}
              source={suggestion.source} />
          )}
          <br />
          <div style={divStyle}><b>Related Lectures</b></div>

          {contentAllLectures.map((suggestion, index) =>
            <VideoRow key={index.toString()}
              id={suggestion.id}
              context={suggestion._highlightResult.text.value}
              timestamp={suggestion.time}
              page={this.props.page}
              source={suggestion.source} />
          )}
        </WrapperVideo>
      );
    }
  }
}

export default Dropdown;
