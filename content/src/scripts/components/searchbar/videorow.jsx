import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Style from 'style-it';

const mappings = {
  "3043092d-83bf-47ca-8466-586af288e869": "https://echo360.org.au/lesson/G_6a461fe2-67cb-454e-afff-24ffc3851a8f_d69a95c6-bd24-4bec-9dfb-8f7aa0477be6_2017-07-24T16:04:00.000_2017-07-24T17:00:00.000/classroom#sortDirection=desc",
  "f98eed25-4747-487f-893c-dff43dcb7822": "https://echo360.org.au/lesson/G_b204987d-2940-4c11-9c9c-ddec65db7054_d69a95c6-bd24-4bec-9dfb-8f7aa0477be6_2017-07-25T16:04:00.000_2017-07-25T17:00:00.000/classroom#sortDirection=desc",
  "db528d36-d54c-4c91-8810-dc774394224b": "https://echo360.org.au/lesson/G_6a461fe2-67cb-454e-afff-24ffc3851a8f_d69a95c6-bd24-4bec-9dfb-8f7aa0477be6_2017-07-31T16:04:00.000_2017-07-31T17:00:00.000/classroom#sortDirection=desc",
  "5dc1b12e-bbeb-4565-831b-9d7da8ad2141": "https://echo360.org.au/lesson/G_b204987d-2940-4c11-9c9c-ddec65db7054_d69a95c6-bd24-4bec-9dfb-8f7aa0477be6_2017-08-01T16:04:00.000_2017-08-01T17:00:00.000/classroom#sortDirection=desc"
}
const mappings2 = {
  "3043092d-83bf-47ca-8466-586af288e869": 1,
  "f98eed25-4747-487f-893c-dff43dcb7822": 2,
  "db528d36-d54c-4c91-8810-dc774394224b": 3,
  "5dc1b12e-bbeb-4565-831b-9d7da8ad2141": 4
}

const thumbnailStyle = {
  textAlign: 'center'
}

const slideTagStyle = {
  padding: '1px 5px',
  backgroundColor: '#dbffa0',
  marginLeft: 8,
  color: '#000',
  fontWeight: 'normal',
  borderRadius: 10,
  fontSize: 12,
  float: 'right'
}

const slideAudioStyle = {
  padding: '1px 5px',
  backgroundColor: '#ffbb00',
  marginLeft: 8,
  color: '#000',
  fontWeight: 'normal',
  borderRadius: 10,
  fontSize: 12,
  float: 'right'
}

const col8Style = {
  fontSize: 15
}

class VideoRow extends Component {
  constructor(props) {
    super(props);
    this.skipOrJump = this.skipOrJump.bind(this);
    this.jumpToVideo = this.jumpToVideo.bind(this);
    this.skipToTime = this.skipToTime.bind(this);
  }

  skipOrJump() {
    // this.jumpToVideo();
    if (this.props.page == 'home') {
      return this.jumpToVideo();
    } else if (this.props.page == 'video') {
      if (document.getElementsByTagName('video')[0].src.indexOf(this.props.id) != -1) {
        //Found it
        console.log('skipping')
        return this.skipToTime();
      }
      else {
        return this.jumpToVideo()
      }
    }
  }
  skipToTime() {
    document.getElementsByTagName('video')[0].currentTime = this.props.timestamp;
    document.getElementsByTagName('video')[0]
    if (document.getElementsByTagName('video')[1]) document.getElementsByTagName('video')[1].currentTime = this.props.timestamp;
    const progressbar = document.getElementsByClassName('timeline')[0].getElementsByClassName('timeline-bg')[0].getElementsByClassName('progress')[0];
    progressbar.style = "width:" + this.props.timestamp / 33.6 + "%";
    var mins = Math.floor(this.props.timestamp / 60);
    var secs = Math.floor(this.props.timestamp % 60);
    if (mins < 10) {
      mins = ('0' + mins).slice(-2)
    }
    if (secs < 10) {
      secs = secs + '0'
    }
    document.getElementsByClassName('currTime')[0].innerText = mins + ":" + secs + " / 55:59";

  }
  jumpToVideo() {
    localStorage.setItem("time", this.props.timestamp);
    document.location = mappings[this.props.id];
  }

  render() {
    var thumbnailUrl;
    var mins = Math.floor(this.props.timestamp / 60);
    var secs = Math.floor(this.props.timestamp % 60);
    if (mins < 10) {
      mins = ('0' + mins).slice(-2)
    }
    if (secs < 10) {
      secs = secs + '0'
    }

    if (this.props.page == 'video') {
      thumbnailUrl = document.getElementsByTagName('video')[0].src.split("hd1")[0] + "thumbnails1/" + Math.round(this.props.timestamp / 60) * 60 + ".jpg";
    } else if (this.props.page == 'home') {
      var images = document.getElementsByClassName('lesson-preview');
      for (var key in images) {
        if (typeof (images[key]) == 'object' && images[key].getElementsByTagName('img')[0].src.indexOf(this.props.id) != -1) {
          thumbnailUrl = images[key].getElementsByTagName('img')[0].src.split("poster1")[0] + "thumbnails1/" + Math.round(this.props.timestamp / 60) * 60 + ".jpg";
        }
      }
    }

    const imgStyle = {
      width: '100%',
      float: 'right'
    }
    const gridStyle = {
      padding: '0'
    }
    const rowStyle = {
      padding: '5px 0',
      cursor: 'pointer'
    }
    const boldFont = {
      fontWeight: 'bold'
    }
    const timeFont = {
      fontStyle: 'italic',
      textDecorationLine: 'underline',
      paddingTop: 40
    }

    var context = this.props.context.replace("<em>", '<em style="background-color: #00aee4; color: white; border-radius: 3px; padding: 1px;">');
    if (context.length > 250) {
      context = context.substring(0, 250) + "...";
    }

    return (
      <div onClick={this.skipOrJump}>
        <Style>
          {`
            .div-hover {

            }
            .div-hover:hover, .div-hover:active, .div-hover.active, .div-hover.disabled, .div-hover[disabled] {
              background-color: #c3e6f4;
              background-position: 0 -15px;
            }
          `}
          <Grid className="div-hover" style={gridStyle} fluid>
            <Row style={rowStyle}>
              <Col xs={8} style={col8Style}>
                <div style={boldFont}>
                  Lecture {mappings2[this.props.id]}
                  {this.props.source == 'slide' && <span style={slideTagStyle}>Slide</span>}
                  {this.props.source == 'audio' && <span style={slideAudioStyle}>Audio</span>}
                </div>
                <div dangerouslySetInnerHTML={{ __html: context }}></div>

              </Col>
              <Col xs={4}>
                <div style={thumbnailStyle}>
                  <img style={imgStyle} src={thumbnailUrl} />
                  <br /><br />
                  <div style={timeFont}> {mins + ":" + secs} mins </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </Style>
      </div>
    );
  }
}

export default VideoRow;
