var Pond = function() {

  var pondParams = {

    normalScale: {
      type: "f",
      value: .3
    },
    texScale: {
      type: "f",
      value: 7
    },
    bumpHeight: {
      type: 'f',
      value: 0
    },
    bumpSize: {
      type: 'f',
      value: 0.001
    },
    bumpSpeed: {
      type: 'f',
      value: .1
    },
    bumpCutoff: {
      type: 'f',
      value: 0.5
    }
  }
  var pondGui = gui.addFolder('Pond Params');
  var pp = pondParams;
  pondGui.add(pp.bumpHeight, 'value').name('bumpHeight');
  pondGui.add(pp.bumpSize, 'value').name('bumpSize');
  pondGui.add(pp.bumpSpeed, 'value').name('bumpSpeed');
  pondGui.add(pp.bumpCutoff, 'value').name('bumpCutoff');

  var pondGeo = new THREE.PlaneGeometry(5000, 5000, 3, 3);

  var pondMat = new THREE.ShaderMaterial({
    uniforms: {
      timer: timer,
      t_normal: {
        type: "t",
        value: TEXTURES.moss
      },
      t_iri: {
        type: "t",
        value: TEXTURES.iriTurq
      },
      normalScale: pondParams.normalScale,
      texScale: pondParams.texScale,
      bumpHeight: pondParams.bumpHeight,
      bumpSize: pondParams.bumpSize,
      bumpSpeed: pondParams.bumpSpeed,
      bumpCutoff: pondParams.bumpCutoff,
      lightCutoff: lightParams.cutoff,
      lightPower: lightParams.power,
      lightPositions: lightParams.positions,
      lightTextures: lightParams.textures,
      lightColors: lightParams.colors,
      cameraPos: {
        type: "v3",
        value: camera.position
      }
    },
    vertexShader: shaders.vs.pond,
    fragmentShader: shaders.fs.pond
  });
  var pond = new THREE.Mesh(pondGeo, pondMat);
  pond.rotation.x = -Math.PI / 2;
  scene.add(pond);

  this.update = function(){
    var audioTextureData = new Float32Array( this.width * 4 );
  }
}