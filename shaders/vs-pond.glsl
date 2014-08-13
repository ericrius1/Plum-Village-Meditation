uniform float timer;
uniform float bumpHeight;
uniform float bumpSize;
uniform float bumpSpeed;
uniform float bumpCutoff;

$simplex

vec3 noisePos(vec3 pos, vec2 offset, float cutoff){
  float multiplier = snoise(pos.xy * vec2(bumpSize, bumpSize * 0.7) + offset);

  vec3 p = pos + vec3(0, 0, 1) * (multiplier + 1.) * bumpHeight * cutoff;

  return p;
}

void main(){
  vec2 centerUV = abs(uv - vec2(.5, .5));

  float dCutoff = max(0., (1. - pow((length(centerUV) * 3.), bumpCutoff)));
  vec2 offset = vec2(timer, timer) * vec2(bumpSpeed, bumpSpeed * 0.7);
  vec3 fPos = noisePos(position, offset, dCutoff);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(fPos, 1.);
}