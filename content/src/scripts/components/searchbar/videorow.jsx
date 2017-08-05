import React, {Component} from 'react';

const mappings = {
  "3043092d-83bf-47ca-8466-586af288e869":"https://echo360.org.au/lesson/G_6a461fe2-67cb-454e-afff-24ffc3851a8f_d69a95c6-bd24-4bec-9dfb-8f7aa0477be6_2017-07-24T16:04:00.000_2017-07-24T17:00:00.000/classroom#sortDirection=desc",
  "f98eed25-4747-487f-893c-dff43dcb7822":"https://echo360.org.au/lesson/G_b204987d-2940-4c11-9c9c-ddec65db7054_d69a95c6-bd24-4bec-9dfb-8f7aa0477be6_2017-07-25T16:04:00.000_2017-07-25T17:00:00.000/classroom#sortDirection=desc",
  "db528d36-d54c-4c91-8810-dc774394224b":"https://echo360.org.au/lesson/G_6a461fe2-67cb-454e-afff-24ffc3851a8f_d69a95c6-bd24-4bec-9dfb-8f7aa0477be6_2017-07-31T16:04:00.000_2017-07-31T17:00:00.000/classroom#sortDirection=desc",
  "5dc1b12e-bbeb-4565-831b-9d7da8ad2141":"https://echo360.org.au/lesson/G_b204987d-2940-4c11-9c9c-ddec65db7054_d69a95c6-bd24-4bec-9dfb-8f7aa0477be6_2017-08-01T16:04:00.000_2017-08-01T17:00:00.000/classroom#sortDirection=desc"
}
const mappings2 = {
  "3043092d-83bf-47ca-8466-586af288e869":1,
  "f98eed25-4747-487f-893c-dff43dcb7822":2,
  "db528d36-d54c-4c91-8810-dc774394224b":3,
  "5dc1b12e-bbeb-4565-831b-9d7da8ad2141":4
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
      if (document.getElementsByTagName('video')[0].src.indexOf(this.props.id) != -1){
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
    if (document.getElementsByTagName('video')[1])  document.getElementsByTagName('video')[1].currentTime = this.props.timestamp;
    const progressbar = document.getElementsByClassName('timeline')[0].getElementsByClassName('timeline-bg')[0].getElementsByClassName('progress')[0];
    progressbar.style = "width:" + this.props.timestamp/33.6 + "%";
    document.getElementsByClassName('currTime')[0].innerText = Math.floor(this.props.timestamp/60) + ":" + Math.floor(this.props.timestamp % 60)+" / 55:59";

  }
  jumpToVideo() {
    localStorage.setItem("time", this.props.timestamp);
    document.location = mappings[this.props.id];
  }

  render() {
    var thumbnailUrl;
    if (this.props.page == 'video') {
      thumbnailUrl = document.getElementsByTagName('video')[0].src.split("hd1")[0] + "thumbnails1/" + Math.round(this.props.timestamp/60) * 60 + ".jpg";
    } else if (this.props.page == 'home') {
      var images = document.getElementsByClassName('lesson-preview');
      for (var key in images) {
        if (typeof(images[key])=='object' && images[key].getElementsByTagName('img')[0].src.indexOf(this.props.id) != -1) {
          thumbnailUrl = images[key].getElementsByTagName('img')[0].src.split("poster1")[0] + "thumbnails1/" + Math.round(this.props.timestamp/60) * 60 + ".jpg";
        }
      }
    }
    return (
      <div onClick={this.skipOrJump}>
        <div>Lecture {mappings2[this.props.id]}</div>
        <div>{this.props.timestamp}</div>
        <div dangerouslySetInnerHTML={{__html: this.props.context}}></div>
        <img src={thumbnailUrl} />
      </div>
    );
  }
}

export default VideoRow;
