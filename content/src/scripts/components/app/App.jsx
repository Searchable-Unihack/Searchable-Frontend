import React, { Component } from 'react';
import Dropdown from '../searchbar/dropdown'
import styled from 'styled-components';
import algoliasearch from 'algoliasearch';

const client = algoliasearch("ITN7Y46FJT", "0f49b009fc84f5df9532d7930fcc0d80");
const index = client.initIndex('searchable');

const InputHome = styled.input`
  @import url('https://fonts.googleapis.com/css?family=Bree+Serif');
  font-family: "Proxima Nova";
  font-size: 16px;
  padding: 6px;
  width: 500px;
	margin: 9px;
	color: black;
  background: linear-gradient(to top, #e6e9f0 0%, #eef1f5 25%);
	border: none;
  border-radius: 3px;
`;

var InputVideo = styled.input`
  @import url('https://fonts.googleapis.com/css?family=Bree+Serif');
  font-family: "Proxima Nova";
  font-size: 16px;
  padding: 6px;
  width: 498px;
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
      setTimeout(() => {this.skipToTime(timeToSkipTo)}, 1000);
    }
  }
  skipToTime(time) {
    // console.log('skipping', time)
    document.getElementsByTagName('video')[0].currentTime = time;
    if (document.getElementsByTagName('video')[1]) document.getElementsByTagName('video')[1].currentTime = time;
    const progressbar = document.getElementsByClassName('timeline')[0].getElementsByClassName('timeline-bg')[0].getElementsByClassName('progress')[0];
    progressbar.style = "width:" + time / 33.6 + "%";
    var mins = Math.floor(time / 60);
    var secs = Math.floor(time % 60);
    if (mins < 10) {
      mins = ('0' + mins).slice(-2)
    }
    if (secs < 10) {
      secs = secs + '0'
    }
    document.getElementsByClassName('currTime')[0].innerText = mins + ":" + secs + " / 55:59";
  }

  render() {
    if (this.props.page == "home") {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
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
