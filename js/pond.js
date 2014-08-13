var Pond = function(){

  var pondParams = {
    bumpHeight: {type: 'f', value: 200},
    bumpSize: {type: 'f', value: 0.001},
    bumpSpeed: {type: 'f', value: .1},
    bumpCutoff: {type: 'f', value: 0.5}
  }
  var pondGui = gui.addFolder('Pond Params');
  var pp = pondParams;
  pondGui.add(pp.bumpHeight, 'value').name('bumpHeight');
  pondGui.add(pp.bumpSize, 'value').name('bumpSize');
  pondGui.add(pp.bumpSpeed, 'value').name('bumpSpeed');
  pondGui.add(pp.bumpCutoff, 'value').name('bumpCutoff');

  var pondGeo = new THREE.PlaneGeometry(5000, 5000, 100, 100);

  var pondMat = new THREE.ShaderMaterial({
    uniforms: {
      timer: timer,
      bumpHeight: pondParams.bumpHeight,
      bumpSize: pondParams.bumpSize,
      bumpSpeed: pondParams.bumpSpeed,
      bumpCutoff: pondParams.bumpCutoff,
    },
    vertexShader: shaders.vs.pond,
    fragmentShader: shaders.fs.pond
  })
  var pond = new THREE.Mesh(pondGeo, pondMat);
  pond.rotation.x = -Math.PI/2;
  scene.add(pond);

  // this.update = function(){
  //   pond.geometry.vertices[5000].z +=1;
  //   pond.geometry.verticesNeedUpdate = true;
  // }
}