var Lotus = function() {

  var x = 0,
    y = 0;
  var petalShape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths

  petalShape.moveTo(x + 25, y + 25);
  petalShape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);

  var geo = new THREE.ShapeGeometry(petalShape);
  var petal = new THREE.Mesh(geo);
  petal.position.y = 200;
  scene.add(petal);

}