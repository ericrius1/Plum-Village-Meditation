function AudioController() {
  this.ctx = new AudioContext();

  this.mute = this.ctx.createGain();
  this.gain = this.ctx.createGain();
  this.analyzer = this.ctx.createAnalyser();

  this.analyzer.frequencyBinCount = 1024;
  this.analyzer.array = new Uint8Array(this.analyzer.frequencyBinCount);

  this.freqByteData = new Uint8Array(this.analyzer.frequencyBinCount);

  // this.audioTexture = new AudioTexture(this)

  this.gain.connect(this.analyzer);
  this.analyzer.connect(this.mute);
  this.mute.connect(this.ctx.destination);
}

AudioController.prototype.update = function() {
  this.analyzer.getByteFrequencyData(this.analyzer.array);
  this.analyzer.getByteFrequencyData(this.freqByteData);


}