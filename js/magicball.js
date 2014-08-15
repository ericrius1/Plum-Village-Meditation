function MagicBall(){
  var audio = AUDIO['omm'];
  var ballGeo = new THREE.IcosahedronGeometry(50, 2);
  var mat = new THREE.ShaderMaterial({
    uniforms:{
      timer: timer,
      t_normal: {type: 't', value: TEXTURES.moss},
      cameraPos: {type: 'v3', value: camera.position},
      color: {type:'v3', value: new THREE.Vector3(0.7, 0.1, 0.7)},
      t_audio: {type: 't', value: audio.texture},
      hovered: {type: 'f', value: 0}
    },
    vertexShader: shaders.vs.ball,
    fragmentShader: shaders.fs.ball
  })
  var ball = new THREE.Mesh(ballGeo, mat);
  ball.playing = false;
  ball.audio = audio;
  ball.audio.gain.gain.value = 0.0;
  ball.position.y = 200;

  looper.everyLoop(function(){
    this.audio.play()
  }.bind(ball));

  ball.audio.updateAnalyzer = true;
  ball.audio.updateTexture = true;
  objectControls.add(ball);
  scene.add(ball);


  ball.select = function(){
    this.playing = !this.playing;
    if(this.playing === false){
      this.audio.gain.gain.value = 0.0;

    }else{
      this.audio.gain.gain.value = 0.8;

    }

  }.bind(ball);

  ball.hoverOver = function(){
    this.material.uniforms.hovered.value = 1.0;
  }.bind(ball);

  ball.hoverOut = function(){
    this.material.uniforms.hovered.value = 0.0;
  }.bind(ball);

  ball.deselect = function(){
    // this.playing = false;
    // this.audio.gain.gain.value = 0.0;
  }

  this.update = function(){
  }


}