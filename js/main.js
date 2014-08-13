
var M = {};
M.scene = new THREE.Scene();
M.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 2000);
M.renderer = new THREE.WebGLRenderer({antialias: true});
M.init = function(){
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(this.renderer.domElement);

  var mesh = new THREE.Mesh(new THREE.SphereGeometry(10));
  mesh.position.z = -20
  this.scene.add(mesh);
}

M.animate = function(){
  requestAnimationFrame(this.animate.bind(this));
  this.renderer.render(this.scene, this.camera);
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){

}