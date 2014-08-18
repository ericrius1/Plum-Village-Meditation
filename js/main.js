//imagine a hurt you have held. Now hold down on the container
//to fill it up with the hurt. now let it go

//Now imagine filling up the container with love for the world
//charge it up. And let it go into the world

var scene, camera, renderer, clock, objectControls;
var pond, petalObject, pond;
var timer = {
  type: 'f',
  value: 0
};
var dT = {
  type: "f",
  value: 0
};
var loader = new Loader();
loader.onStart = function() {
  init();
  animate();

}
loader.onCurtainLifted = function() {
  looper.start();
}
var TEXTURES = {};
var normals = [];
loadTexture('moss', 'assets/normals/sand.png', normals)

var shaders = new ShaderLoader('shaders');

loader.beginLoading();
shaders.load('vs-pond', 'pond', 'vertex');
shaders.load('fs-pond', 'pond', 'fragment');
shaders.load('vs-ball', 'ball', 'vertex');
shaders.load('fs-ball', 'ball', 'fragment');

shaders.shaderSetLoaded = function() {
  loader.endLoading();
}

var gui = new dat.GUI({
  autoplace: false
});
gui.close();

var guiContainer = document.getElementById('GUI');
guiContainer.appendChild(gui.domElement)


//*****************AUDIO***************
var audioController = new AudioController();
var AUDIO = {};



var looper = new Looper(audioController, timer, {
  beatsPerMinute: 120,
  beatsPerMeasure: 4,
  measuresPerLoop: 2
});

var lightParams = {

  cutoff: {
    type: "f",
    value: 1000
  },
  power: {
    type: "f",
    value: 1
  },
  positions: {
    type: "v3v",
    value: []
  },
  textures: {
    type: "tv",
    value: []
  },
  colors: {
    type: "v3v",
    value: []
  },
  normalScale: {
    type: "f",
    value: 1.5
  },
  texScale: {
    type: "f",
    value: 1.5
  },

}

var lightGui = gui.addFolder( 'Light Params' );

lightGui.add( lightParams.cutoff , 'value' ).name( 'cutoff' );
lightGui.add( lightParams.power  , 'value' ).name( 'power' );
lightGui.add( lightParams.normalScale , 'value' ).name( 'normalScale' );
lightGui.add( lightParams.texScale  , 'value' ).name( 'texScale' );

var camZoomOut = 0.001;
var camZoomOutIncrease = 1.001;
function init() {
  var stream = new Stream('audio/splendor.mp3', audioController);
  stream.play();
  clock = new THREE.Clock();
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 200000);
  // camera.position.z = 2000;
  camera.position.y = 410;
  camera.lookAt(new THREE.Vector3());
  renderer.setSize(window.innerWidth, window.innerHeight);

  container = document.createElement('div');
  container.id = "container";
  document.body.appendChild(container);
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI / 2.1;

  objectControls = new ObjectControls(camera);

  pond = new Pond();
  lotus = new Lotus();

}

function animate() {
  dT.value = clock.getDelta();
  timer.value += dT.value;
  requestAnimationFrame(animate);
  controls.update();
  objectControls.update();
  audioController.update();
  renderer.render(scene, camera);
  pond.update();
  lotus.update();
  // camera.position.y += camZoomOut;
  // camZoomOut *= camZoomOutIncrease;
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadTexture(name, file, array) {
  this.loader.beginLoading();
  var cb = function() {
    loader.endLoading();
  };

  var m = THREE.UVMapping;

  var l = THREE.ImageUtils.loadTexture;

  TEXTURES[name] = l(file, m, cb);
  TEXTURES[name].wrapS = THREE.RepeatWrapping;
  TEXTURES[name].wrapT = THREE.RepeatWrapping;
  array.push(TEXTURES[name]);
}

window.addEventListener('resize', onResize, false);