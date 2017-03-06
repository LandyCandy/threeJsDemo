export default class {
  constructor (mod) {
    this.torusKnots = mod.torusKnots;
    this.analyser = mod.analyser;
    this.renderer = mod.renderer;
    this.scene = mod.scene;
    this.camera = mod.camera;
    this.rotX = 0.01;
    this.rotY = 0.01;
  }

  buildFreqData () {
    let freqArrI = this.analyser.getFrequencyData();
    let avg = this.analyser.getAverageFrequency();
    let freqArr = [];
    for (let i = 0; i < freqArrI.length; i++) {
      //Reduce the difference in scalar values btwn frames
      //by normalizing value between 0 and 1
      freqArr[i] = (freqArrI[i] + avg)/512;
    }

    //break into each knot's visFreq
    var keys = Object.keys(this.torusKnots);

    //take averages of two channels and create baseline of 0.25
    this.torusKnots.mid.visFreq = ((freqArr[1] + freqArr[2])/2) + 0.25;
    this.torusKnots.left.visFreq = ((freqArr[3] + freqArr[4])/2) + 0.25;
    this.torusKnots.right.visFreq = ((freqArr[5] + freqArr[6])/2) + 0.25;

  }

  render () {
      var freqArr = this.buildFreqData();

      for (var prop in this.torusKnots) {
        this.torusKnots[prop].rotation.x += this.rotX;
        this.torusKnots[prop].rotation.y += this.rotY;
        this.torusKnots[prop].scale.setScalar(this.torusKnots[prop].visFreq);
      }

      this.renderer.render(this.scene, this.camera);

      // console.log(this.analyser.getFrequencyData());
  }
}
