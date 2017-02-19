import * as THREE from '../../lib/three'

export default class {

  constructor(camera, source) {
    let {audioLoader, sound} = this.createListener(camera);
    this.loadSource(source, audioLoader, sound);
    this.analyser = this.createAnalyser(sound);
  }

  createListener(camera) {
    //Create an AudioListener and add it to the camera
    let listener = new THREE.AudioListener();
    camera.add(listener);

    // create an Audio source
    let sound = new THREE.Audio(listener);
    let audioLoader = new THREE.AudioLoader();
    return {audioLoader, sound};
  }

  loadSource(source, audioLoader, sound) {
    //Load a sound and set it as the Audio object's buffer
    audioLoader.load(source, function( buffer ) {
    	sound.setBuffer( buffer );
    	sound.setLoop(true);
    	sound.setVolume(0.5);
    	sound.play();
    });
  }

  createAnalyser(sound) {
    return new THREE.AudioAnalyser(sound, 32);
  }

  getAverageFrequency() {
    return this.analyser.getAverageFrequency();
  }

  getFrequencyData() {
    return this.analyser.getFrequencyData();
  }
}
