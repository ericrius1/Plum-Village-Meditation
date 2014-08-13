var Lotus = function() {
  var loader = new THREE.OBJMTLLoader();


  loader.load('assets/petal.obj', 'assets/petal.mtl', function(object) {
    var petal = object.clone();
    // petal.position = new THREE.Vector3(0, 0, 0);
    // petal.rotation.order = 'YXZ'
    console.log(petal)
    // var mesh = new THREE.Mesh(new THREE.SphereGeometry(5));
    // M.scene.add(mesh);
    // petal.position.z = -10;
    M.scene.add(petal);
  })
}