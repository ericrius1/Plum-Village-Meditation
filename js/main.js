var scene, camera, renderer, pond;

var loader = new Loader();
loader.onStart = function(){
  init();
  animate();
}
var TEXTURES = {};
var normals = [];
loadTexture('moss', 'assets/normals/sand.png', normals)

var shaders = new ShaderLoader('shaders');

loader.beginLoading();
shaders.load('vs-pond', 'pond', 'vertex');
shaders.load('fs-pond', 'pond', 'fragment');

shaders.shaderSetLoaded = function(){
  loader.endLoading();
}

var gui = new dat.GUI({autoplace: false});
gui.close();

var guiContainer = document.getElementById('GUI');
guiContainer.appendChild(gui.domElement)

var audio = new AudioController();

function init() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 200000);
  camera.position.z = 2000;
  renderer.setSize(window.innerWidth, window.innerHeight);

  container = document.createElement('div');
  container.id = "container";
  document.body.appendChild(container);
  container.appendChild(renderer.domElement);
  
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  pond = new Pond();
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