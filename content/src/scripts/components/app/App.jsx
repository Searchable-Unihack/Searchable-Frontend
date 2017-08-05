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
`;

const Input = styled.input`
  padding: 1em;
  padding-right: 20em;
	margin: 0.5em;
	color: palevioletred;
	background: papayawhip;
	border: none;
	border-radius: 3px;
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
    // console.log(content);
    if (err) {
      console.error(err);
      return;
    }

    this.setState({content: content.hits})
    //this.content = content;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log(event.target.value);
    index.search(event.target.value, (err, content) => {this.updateContent(err, content)});


      // for (var h in content.hits) {

      //   console.log('Hit(' + content.hits[h].objectID + '): ' + JSON.stringify(content.hits[h]));
      // }
    
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    console.log('yay it mounted')
  }

  render() {
    return (
      <div>
        <form autocomplete="off" onSubmit={this.handleSubmit}>
          <label>
            {/* <Title>
              Searchable
            </Title> */}

            <Input placeholder="@mxstbr" type="text" name="name" value={this.state.value} onChange={this.handleChange} />
          </label>
          <Dropdown content={this.state.content} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(App);
