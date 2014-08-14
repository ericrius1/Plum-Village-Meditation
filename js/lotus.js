var Lotus = function() {


  var light = new THREE.PointLight(0xeeeeee);
  light.position.set(-10, 20, -20);
  scene.add(light);

  var light = new THREE.PointLight(0xdddddd);
  light.position.set(0, -10, 3);
  scene.add(light);

  var pointLight = new THREE.PointLight(0x3A8BAB);
  pointLight.position.set(5, 20, 20);
  scene.add(pointLight);

  var numPetals = 20
  var petals = [];
  var petal;
  var spin = 1.8;
  var bloom = 0.00;
  var expand = 0.04;
  var growth = 0.02;
  var spinOffset = 0;

  var petal;
  var petalGeo;
  for (var i = 0; i < numPetals; i++) {
    petalGeo = petalObject.clone().children[0].geometry;
    petal = new THREE.Mesh(petalGeo);
    // petal.rotation.order = "YXZ";
    petal.rotation.y = i * spin;
    petal.rotation.x = -i * bloom + Math.sin(i * growth) * 0.01;
    petal.rotation.z = 0.2;

    petal.position.z = -i * expand;
    petal.position.y = 20 * growth - 20 * (i / numPetals) * growth;

    petal.position.applyEuler(new THREE.Euler(0, (spin + spinOffset) * i, 0, 'XYZ'));
    petals.push(petal);
    scene.add(petal);
  }
  this.updateFlower = function() {
    for (var i = 0; i < numPetals; i++) {
      petals[i].position = new THREE.Vector3(0, 0, 0);
      petals[i].rotation.x = 0;
      petals[i].rotation.y = 0;
      petals[i].rotation.z = 0;

      petals[i].rotation.x = -i * bloom + Math.sin( i * 0.02) * 0.01;
      petals[i].rotation.y = i * spin;
      petals[i].rotation.z = spinOffset;


      petals[i].position.z = -i * expand;
      petals[i].position.y = 20 * growth - 20 * (i / numPetals) * growth;

      petals[i].position.applyEuler(new THREE.Euler(0, (spin + spinOffset) * i, 0, 'XYZ'));
    }
  }

  this.update = function() {
    bloom += .0001;
    this.updateFlower();
  }
}