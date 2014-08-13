var Pond = function(){

  var pondParams = {
    bumpHeight: {type: 'f', value: 7},
    bumpSpeed: {type: 'f', value: .1},
    bumpSize: {type: 'f', value: 0.001},
    bumpCutoff: {type: 'f', value: 0.5}
  }
  var pondGui = gui.addFolder('Pond Params');
  var pp = pondParams;
  pondGui.add(pp.bumpHeight, 'value').name('bumpHeight');
  pondGui.add(pp.bumpSize, 'value').name('bumpSize');
  pondGui.add(pp.bumpSpeed, 'value').name('bumpSpeed');
  pondGui.add(pp.bumpCutoff, 'value').name('bumpCutoff');

  var pondGeo = new THREE.PlaneGeometry(5000, 5000, 100, 100);
  var pond = new THREE.Mesh(pondGeo);
  pond.rotation.x = -Math.PI/2;
  scene.add(pond);
}