var STREAM, SOURCE, GAIN, CONTROLLER;

function Stream(file, controller, looping) {
  this.file = file;
  this.controller = controller
  if (!STREAM) {
    STREAM = new Audio();
    var ctx = controller.ctx;
    SOURCE = ctx.createMediaElementSource(STREAM);
    GAIN = ctx.createGain();

    SOURCE.connect(GAIN);

    GAIN.connect(controller.gain);
    CONTROLLER = controller;
  }
}

Stream.prototype.play = function() {
  this.playing = true;
  STREAM.src = this.file;
  STREAM.play();
  var curTime = CONTROLLER.ctx.currentTime;
  GAIN.gain.linearRampToValueAtTime(0, curTime + 2);
  GAIN.gain.linearRampToValueAtTime(1, curTime + 10);
}