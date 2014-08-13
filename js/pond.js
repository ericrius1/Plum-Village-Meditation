var Pond = function(){
  var pondGeo = new THREE.PlaneGeometry(5000, 5000, 100, 100);

  var pond = new THREE.Mesh(pondGeo);
  pond.rotation.x = -Math.PI/2;
  scene.add(pond);
}