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
    }
  })
  var ball = new THREE.Mesh(ballGeo);
  ball.playing = false;
  ball.audio = audio;
  ball.position.y = 200;
  scene.add(ball);

  looper.everyLoop(function(){this.audio.play}.bind(ball));

  objectControls.add(ball);


  ball.select = function(){
    this.playing = !this.playing;
    if(this.playing === false){
      this.audio.gain.gain.value = 0.0;
    }else{
      this.audio.gain.gain.value = 0.8;
    }
    ball.material.color.r = 1;
    audio.play();

  }.bind(ball);

  ball.deselect = function(){
    this.playing = false;
    this.audio.gain.gain.value = 0.0;
  }


}