import React from 'react'

var styles = {
  controlBar : {
    bottom : '0',
    color: '#000000',
    zIndex: '1',
    position: 'absolute'
  },
  button : {
    height: '100%',
    'borderRadius': '50%',
    border: '1px solid black',
    color: '#FFFFFF',
    float: 'left'
  },
  inputFile : {
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: '-1'
  }
}

class Controls extends React.Component {
  render() {
    return (
      <div style={styles.controlBar}>
        <PlayPauseButton scene={this.props.scene}/>
        <FileLoader scene={this.props.scene}/>
      </div>
    )
  }
}

class FileLoader extends React.Component {
  constructor() {
    super();
    this.loadNewFile = this.loadNewFile.bind(this);
  }

  loadNewFile(e) {
    let url = URL.createObjectURL(e.target.files[0]);
    this.props.scene.addNewAudio(url);
  }

  render() {
    return (
      <div style={styles.button}>
        <input type="file" name="file" id="file" onChange={this.loadNewFile} style={styles.inputFile}/>
        <label htmlFor="file" className={'glyphicon glyphicon-file'}></label>
      </div>
    )
  }
}

class PlayPauseButton extends React.Component {
  constructor() {
    super()
    this.icon = {
      'play' : 'glyphicon glyphicon-play',
      'pause' : 'glyphicon glyphicon-pause'
    };
    this.playPause = this.playPause.bind(this);
    this.state = {'playback' : 'play'}
  }

  playPause() {
    if (this.state.playback === 'play') {
      this.setState({'playback' : 'pause'});
      this.props.scene.analyser.pauseAudio();
      this.props.scene.ani.rotX = 0;
      this.props.scene.ani.rotY = 0;
    } else {
      this.setState({'playback' : 'play'});
      this.props.scene.analyser.playAudio();
      this.props.scene.ani.rotX = 0.01;
      this.props.scene.ani.rotY = 0.01;
    }
  }

  render() {
    return (
      <div onClick={this.playPause} style={styles.button}>
        <span className={this.icon[this.state.playback]}/>
      </div>
    )
  }
}

export default Controls;
