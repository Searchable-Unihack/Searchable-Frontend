import React, { Component } from 'react';
import Dropdown from '../searchbar/dropdown'
import styled from 'styled-components';
import algoliasearch from 'algoliasearch';

const client = algoliasearch("ITN7Y46FJT", "0f49b009fc84f5df9532d7930fcc0d80");
const index = client.initIndex('searchable');


const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
  background: -webkit-linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 0.15px;
  -webkit-text-stroke-color: black;
`;

const InputHome = styled.input`
  @import url('https://fonts.googleapis.com/css?family=Bree+Serif');
  font-family: "Proxima Nova";
  font-size: 16px;
  padding: 6px;
  width: 400px;
	margin: 8px;
	color: black;
  background: linear-gradient(to top, #e6e9f0 0%, #eef1f5 25%);
	border: none;
  border-radius: 3px;
`;

var InputVideo = styled.input`
  @import url('https://fonts.googleapis.com/css?family=Bree+Serif');
  font-family: "Proxima Nova";
  font-size: 14px;
  padding: 4px;
  width: 350px;
	margin: 8px;
	color: black;
  background: linear-gradient(to top, #e6e9f0 0%, #eef1f5 25%);
	border: none;
  border-radius: 3px;
`;



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', content: '', showDropdown: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  updateContent(err, content) {
    if (err) {
      console.error(err);
      return;
    }

    this.setState({ content: content.hits })
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    if (event.target.value == "") {
      this.setState({ showDropdown: false });
    }
    else {
      this.setState({ showDropdown: true });
      index.search(event.target.value, (err, content) => { this.updateContent(err, content) });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    var timeToSkipTo = localStorage.getItem('time');
    localStorage.removeItem('time');
    if (timeToSkipTo) {
      this.skipToTime(timeToSkipTo);
    }
  }
  skipToTime(time) {
    document.getElementsByTagName('video')[0].currentTime = time;
    if (document.getElementsByTagName('video')[1]) document.getElementsByTagName('video')[1].currentTime = time;
    const progressbar = document.getElementsByClassName('timeline')[0].getElementsByClassName('timeline-bg')[0].getElementsByClassName('progress')[0];
    progressbar.style = "width:" + time / 33.6 + "%";
    document.getElementsByClassName('currTime')[0].innerText = Math.floor(time / 60) + ":" + Math.floor(time % 60) + " / 55:59";
  }

  render() {
    if (this.props.page == "home") {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              {/* <Title>
                Searchable
              </Title> */}
              <InputHome placeholder="Search something..." type="text" name="name" value={this.state.value} onChange={this.handleChange} />
            </label>
            {this.state.showDropdown && <Dropdown content={this.state.content} page={this.props.page} />}
          </form>
        </div>
      );
    } else if (this.props.page == "video") {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              {/* <Title>
                Searchable
              </Title> */}
              <InputVideo placeholder="Search something..." type="text" name="name" value={this.state.value} onChange={this.handleChange} />
            </label>
            {this.state.showDropdown && <Dropdown content={this.state.content} page={this.props.page} />}

          </form>
        </div>
      );
    }
  }
}

export default App;
