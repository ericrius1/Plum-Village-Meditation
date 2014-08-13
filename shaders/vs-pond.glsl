uniform float timer;
uniform float bumpHeight;
uniform float bumpSize;
uniform float bumpSpeed;
uniform float bumpCutoff;

$simplex

void main(){
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}