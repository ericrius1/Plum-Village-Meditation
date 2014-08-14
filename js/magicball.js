function MagicBall(){
  var ballGeo = new THREE.IcosahedronGeometry(50, 2);
  var ball = new THREE.Mesh(ballGeo);
  ball.position.y = 200;
  scene.add(ball);

  objectControls.add(ball);

  ball.select = function(){
    debugger;
    ball.material.color.r = 1;
  }


}