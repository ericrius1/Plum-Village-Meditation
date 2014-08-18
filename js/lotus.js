var Lotus = function() {
  var color = new THREE.Vector3(1.0, 0.2, 1.0);

  var xoff = 0,
    yoff = 0;
  var petals = [];
  var numPetals = 15;
  var vertexCount = 0;

  var petalShape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths
  //262, 16
  var x= 262;
  petalShape.moveTo(xoff, yoff);
  //aCP1x, aCP1y,aCP2x, aCP2y,aX, aY 
  petalShape.bezierCurveTo(x- 254 + xoff, 3 + yoff, x - 258 + xoff, 49 + yoff, x - 256 + xoff, 34 + yoff);
  petalShape.bezierCurveTo(x- 254 + xoff, 19 + yoff, x - 240 + xoff, 94 + yoff, x - 240 + xoff, 114 + yoff);
  petalShape.bezierCurveTo( x - 240 + xoff, 135 + yoff, x - 228 + xoff, 175 + yoff, x - 281 + xoff, 172 + yoff);
  petalShape.bezierCurveTo( x - 296 + xoff, 171 + yoff, x - 310 + xoff, 125 + yoff, x - 302 + xoff, 106 + yoff);
  petalShape.bezierCurveTo( x - 296 + xoff, 92 + yoff, x - 283 + xoff, 48 + yoff, x - 273 + xoff, 36 + yoff);
  petalShape.bezierCurveTo( x - 263 + xoff, 24 + yoff, x - 275 + xoff, 9 + yoff, x - 266 + xoff, 21 + yoff);

//bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5, curveSegments: 12
  var extrudeSettings = {
    amount: 1, bevelSegments: 1, curveSegments: 40, bevelEnabled: false
  }

  var geo = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
  // geo.applyMatrix( new THREE.Matrix4().makeTranslation( new THREE.Vector3(0, 0, 0) ) );

  function createShaderMaterial(){
    var color = new THREE.Vector3(1.0, 0.0, 1.0) 
    var uniforms =  {
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
    };
    return new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shaders.vs.ball,
      fragmentShader: shaders.fs.ball 
    });
  }

  var petal;

  var mat;
  for (var i = 0; i < numPetals; i++) {
    petal = new THREE.Mesh(geo, createShaderMaterial());
    petal.rotation.order = "YXZ";
    petal.position.y = 401;
    petal.rotation.y = ( i / numPetals * (Math.PI * 2));
    petals.push(petal);
    scene.add(petal);
    vertexCount+= petal.geometry.vertices.length
  }
  console.log("num vertices",vertexCount)


  //for some reason need to set intial rotation in another loop?? WHY?
  for (var i = 0; i < numPetals; i++) {
    petals[i].rotation.x -= 0.2
  }


  lightParams.textures.value.push(undefined);
  lightParams.positions.value.push(petals[0].position);
  lightParams.colors.value.push(color);

  this.update = function() {
    for(var i = 0 ; i < numPetals; i++){
      petals[i].rotation.x -= 0.0005;
    }
  }

}


