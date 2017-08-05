import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const Input1 = styled.input`
  @import url('https://fonts.googleapis.com/css?family=Bree+Serif');
  font-family: "Proxima Nova";
  font-size: 14px;
  padding: 0.5em;
  padding-right: 20em;
	margin: 0.5em;
	color: black;
  background: linear-gradient(to top, #e6e9f0 0%, #eef1f5 25%);
	border: none;
  border-radius: 3px;
  margin-top: 25px;
`;

const Input2 = styled.input`
  @import url('https://fonts.googleapis.com/css?family=Bree+Serif');
  font-family: "Proxima Nova";
  font-size: 14px;
  padding: 0.5em;
	margin: 0.5em;
	color: black;
  background: linear-gradient(to top, #e6e9f0 0%, #eef1f5 25%);
	border: none;
  border-radius: 3px;
  margin-top: 25px;
  width: 200%;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', content: '' };
    //this.content = '';
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  updateContent(err, content) {
    if (err) {
      console.error(err);
      return;
    }

    this.setState({content: content.hits})
    //this.content = content;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    index.search(event.target.value, (err, content) => {this.updateContent(err, content)});    
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
  }

  render() {
    if (this.props.page == "home") {
      return(
        <div>
          <form autocomplete="off" onSubmit={this.handleSubmit}>
            <label>
              {/* <Title>
                Searchable
              </Title> */}
              <Input1 placeholder="Search something..." type="text" name="name" value={this.state.value} onChange={this.handleChange} />
            
            </label>
            <Dropdown content={this.state.content} page={this.props.page} />
          </form>
        </div>
      );
    } else if (this.props.page == "video") {
      return(
        <div>
          <form autocomplete="off" onSubmit={this.handleSubmit}>
            <label>
              {/* <Title>
                Searchable
              </Title> */}
              <Input2 placeholder="Search something..." type="text" name="name" value={this.state.value} onChange={this.handleChange} />
            
            </label>
            <Dropdown content={this.state.content} page={this.props.page} />
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(App);
