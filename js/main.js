var scene, camera, renderer;

var loader = new Loader();
loader.onStart = function(){
  init();
  animate();
}

var audio = new AudioController();
var TEXTURES = {};
var normals = [];
loadTexture('moss', 'assets/normals/sand.png', normals)

function init() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 2000);
  camera.position.z = 200;
  controls = new THREE.OrbitControls(camera);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function onResize() {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadTexture(name, file, array){
  this.loader.beginLoading();
  var cb = function(){
    loader.endLoading();
  };

  var m = THREE.UVMapping;

  var l = THREE.ImageUtils.loadTexture;

  TEXTURES[name] = l(file, m, cb);
  array.push(TEXTURES[name]);
}

window.addEventListener('resize', onResize, false);