var Lotus = function() {
  var color = new THREE.Vector3(1.0, 0.2, 1.0);

  var xoff = 0,
    yoff = 0;
  var petals = [];
  var numPetals = 10;
  var vertexCount = 0;

  var petalShape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths
  petalShape.moveTo(262 + xoff, 16 + yoff);
  //aCP1x, aCP1y,aCP2x, aCP2y,aX, aY 
  petalShape.moveTo(262 + xoff, 16 + yoff);
  petalShape.bezierCurveTo(254 + xoff, 3 + yoff, 258 + xoff, 49 + yoff, 256 + xoff, 34 + yoff);
  petalShape.bezierCurveTo(254 + xoff, 19 + yoff, 240 + xoff, 94 + yoff, 240 + xoff, 114 + yoff);
  petalShape.bezierCurveTo(240 + xoff, 135 + yoff, 228 + xoff, 175 + yoff, 281 + xoff, 172 + yoff);
  petalShape.bezierCurveTo(296 + xoff, 171 + yoff, 310 + xoff, 125 + yoff, 302 + xoff, 106 + yoff);
  petalShape.bezierCurveTo(296 + xoff, 92 + yoff, 283 + xoff, 48 + yoff, 273 + xoff, 36 + yoff);
  petalShape.bezierCurveTo(263 + xoff, 24 + yoff, 275 + xoff, 9 + yoff, 266 + xoff, 21 + yoff);

  var extrudeSettings = {
    amount: 1,
  }

  var geo = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);


  var mat = new THREE.ShaderMaterial({
    uniforms: {
      timer: timer,
      normalScale: lightParams.normalScale,
      texScale: lightParams.texScale,
      t_normal: {
        type: 't',
        value: TEXTURES.moss
      },
      cameraPos: {
        type: 'v3',
        value: camera.position
      },
      color: {
        type: 'v3',
        value: color
      },
      t_audio: {
        type: 't',
        value: audioController.texture
      },
      hovered: {
        type: 'f',
        value: 0
      }
    },
    vertexShader: shaders.vs.ball,
    fragmentShader: shaders.fs.ball
  })

  var petal = new THREE.Mesh(geo, mat);

  for (var i = 0; i < numPetals; i++) {
    petal = petal.clone();
    petal.position.y = 50;
    petals.push(petal);
    scene.add(petal);
    petal.rotation.y = (i / numPetals * (Math.PI * 2));
  }


  lightParams.textures.value.push(undefined);
  lightParams.positions.value.push(petals[0].position);
  lightParams.colors.value.push(color);


  this.update = function() {
    for (var i = 0; i < numPetals; i++) {
      petals[i].rotation.z -= .001;
    }
  }

}