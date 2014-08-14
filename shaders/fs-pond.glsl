varying vec3 vMPos;

void main(){
  float intensity = distance(0.0, vMPos.y) * 0.01;
  gl_FragColor = vec4(0.8, 0.0, 0.8, 1.0) * intensity;
}