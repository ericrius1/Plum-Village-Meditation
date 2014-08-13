
var M = {};

M.audio = new AudioController();

M.scene = new THREE.Scene();
M.renderer = new THREE.WebGLRenderer({antialias: true});
M.w = window.innerWidth;
M.h = window.innerHeight;
M.ratio = M.w / M.h;
M.camera = new THREE.PerspectiveCamera(60, M.ratio, 1, 2000);

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

M.onResize = function(){
  this.w = window.innerWidth;
  this.h = window.innerHeight;
  this.ratio = this.w / this.h;
  this.camera.aspect = this.ratio;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(this.w, this.h);

}

window.addEventListener('resize', M.onResize.bind(M), false);
