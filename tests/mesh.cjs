'use strict';
const assert = require('node:assert/strict');
const path = require('node:path');
const modulePath = process.argv[2] || path.resolve(__dirname, '../bubble-material.js');
const material = require(path.resolve(modulePath));
const tests = [];
const test = (name, fn) => tests.push([name, fn]);
const dot = (a,b) => a.reduce((sum,v,i) => sum+v*b[i],0);
const add = (a,b) => a.map((v,i) => v+b[i]);
const sub = (a,b) => a.map((v,i) => v-b[i]);
const mul = (a,s) => a.map(v => v*s);
const cross = (a,b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
const unit = a => mul(a,1/Math.hypot(...a));
const position = (n,p) => material.sampleSurface(n,{parameters:p}).position;
const axis = [[1,0,0],[0,1,0],[0,0,1]];
const base = {a:0,b:0,c:0,pressure:0,direction:[1,0,0],flow:unit([.4,.8,.3])};
const excited = {...base,a:.04,b:.026,c:.011,pressure:.24,direction:unit([.7,-.3,.5])};
const directionAt = (i,count) => {
  const y=1-2*(i+.5)/count, phi=i*Math.PI*(3-Math.sqrt(5)), r=Math.sqrt(1-y*y);
  return [r*Math.cos(phi),y,r*Math.sin(phi)];
};

test('metadata: 1,189 vertices and 2,160 indexed triangles', () => {
  const m=material.createMesh(), info=material.diagnostics();
  assert.equal(m.positions.length/3,1189);
  assert.equal(m.indices.length/3,2160);
  assert.equal(info.vertices,1189);
  assert.equal(info.triangles,2160);
  assert(m.positions instanceof Float32Array);
  assert(m.indices instanceof Uint16Array);
});

test('all indices valid, every triangle non-degenerate and outward wound', () => {
  const m=material.createMesh(), count=m.positions.length/3;
  const vertex=i => Array.from(m.positions.subarray(i*3,i*3+3));
  for(let i=0;i<m.indices.length;i+=3){
    const ids=Array.from(m.indices.subarray(i,i+3));
    assert(ids.every(j => Number.isInteger(j)&&j>=0&&j<count));
    assert.equal(new Set(ids).size,3);
    const [a,b,c]=ids.map(vertex), normal=cross(sub(b,a),sub(c,a));
    assert(Math.hypot(...normal)>1e-6,`zero triangle ${i/3}`);
    assert(dot(normal,add(add(a,b),c))>0,`inward triangle ${i/3}`);
  }
});

test('model is a non-planar unit sphere spanning three dimensions', () => {
  const m=material.createMesh(), extrema=axis.map(()=>[Infinity,-Infinity]);
  for(let i=0;i<m.positions.length;i+=3){
    const p=Array.from(m.positions.subarray(i,i+3));
    assert(Math.abs(Math.hypot(...p)-1)<1e-6);
    p.forEach((v,k)=>{extrema[k][0]=Math.min(extrema[k][0],v);extrema[k][1]=Math.max(extrema[k][1],v);});
  }
  for(const [minimum,maximum] of extrema){assert(minimum<-.99);assert(maximum>.99);}
});

test('localized contact dents the impact point with compensating opposite bulge', () => {
  const p={...base,pressure:.2};
  const impact=Math.hypot(...position([1,0,0],p));
  const opposite=Math.hypot(...position([-1,0,0],p));
  const nearby=Math.hypot(...position(unit([1,.2,0]),p));
  const side=Math.hypot(...position([0,1,0],p));
  assert(impact<.83);
  assert(opposite>1.012&&opposite<1.013);
  assert(nearby>impact&&nearby<.86);
  assert(side>1.012&&side<opposite);
});

test('surface deformation cannot be represented by one affine sprite transform', () => {
  const midpoints=axis.map(n=>mul(add(position(n,excited),position(mul(n,-1),excited)),.5));
  const translation=mul(midpoints.reduce(add,[0,0,0]),1/3);
  const columns=axis.map(n=>mul(sub(position(n,excited),position(mul(n,-1),excited)),.5));
  let maxResidual=0;
  for(let i=0;i<128;i++){
    const n=directionAt(i,128);
    const affine=columns.reduce((sum,col,j)=>add(sum,mul(col,n[j])),translation);
    maxResidual=Math.max(maxResidual,Math.hypot(...sub(position(n,excited),affine)));
  }
  assert(maxResidual>.06,`unexpected affine residual ${maxResidual}`);
});

test('analytical normals agree with numerical normals on the displaced surface', () => {
  const epsilon=1e-5;
  for(let i=0;i<256;i++){
    const n=directionAt(i,256);
    const tangent=unit(cross(Math.abs(n[1])<.9?[0,1,0]:[1,0,0],n));
    const bitangent=cross(n,tangent);
    const derivative=t=>sub(position(add(n,mul(t,epsilon)),excited),position(sub(n,mul(t,epsilon)),excited));
    const numeric=unit(cross(derivative(tangent),derivative(bitangent)));
    const analytic=material.sampleSurface(n,{parameters:excited}).normal;
    assert(Math.abs(Math.hypot(...analytic)-1)<1e-12);
    assert(dot(numeric,analytic)>1-1e-9,`normal mismatch at direction ${i}`);
  }
});

test('combined mode/contact deformation preserves volume within one percent', () => {
  const count=12000;
  for(const p of [excited,{...excited,pressure:-.15}]){
    let radialVolume=0;
    for(let i=0;i<count;i++)radialVolume+=Math.hypot(...position(directionAt(i,count),p))**3;
    const ratio=radialVolume/count;
    assert(Math.abs(ratio-1)<.01,`volume ratio ${ratio}`);
  }
});

test('signed spring recovery moves through outward overshoot then settles', () => {
  let s={position:.18,velocity:0},minimum=s.position;
  for(let i=0;i<120;i++){s=material.stepSpring(s.position,s.velocity,1/60);minimum=Math.min(minimum,s.position);}
  assert(minimum<-.02,`missing elastic overshoot ${minimum}`);
  assert(Math.abs(s.position)<1e-6);
  const p=material.parameters({pressure:minimum});
  assert(p.pressure<0);
  const outward={...base,pressure:p.pressure};
  assert(Math.hypot(...position([1,0,0],outward))>1);
});

test('reduced motion preserves a sphere and material has no time-based blink uniform', () => {
  const p=material.parameters({age:27,phase:1,speed:140,pressure:.2,reducedMotion:true});
  assert(p.a===0&&p.b===0&&p.c===0&&p.pressure===0);
  for(let i=0;i<20;i++)assert(Math.abs(Math.hypot(...position(directionAt(i,20),p))-1)<1e-12);
  const fragment=material.shaders.fragment;
  assert(!/uniform\s+\w+\s+u(?:Time|Age|Phase|Blink|Pulse)\b/i.test(fragment));
  assert(!/\bsin\s*\(/.test(fragment));
});

test('GPU vertex shader displaces actual 3D vertices and supplies surface normals', () => {
  const vertex=material.shaders.vertex;
  assert.match(vertex,/attribute\s+vec3\s+aDirection/);
  assert.match(vertex,/vec3\s+p\s*=\s*n\s*\*\s*f/);
  assert.match(vertex,/vNormal\s*=\s*normalize\(f\s*\*\s*n\s*-\s*\(g\s*-\s*n\s*\*\s*dot\(n,\s*g\)\)\)/);
  assert.match(vertex,/gl_Position\s*=\s*vec4\([^;]*-p\.z/s);
});

test('same-color bubbles retain distinct deterministic shapes and rhythms', () => {
  const options={age:2.4,phase:0,speed:80,wind:0.4};
  const profiles=Array.from({length:16},(_,seed)=>material.personality(seed));
  assert.equal(new Set(profiles.map(p=>p.rate)).size,16);
  assert.equal(new Set(profiles.map(p=>p.softness)).size,16);
  const shapes=profiles.map((_,seed)=>Array.from({length:12},(_,i)=>position(directionAt(i,12),material.parameters({...options,seed}))));
  assert.equal(new Set(shapes.map(JSON.stringify)).size,16);
  assert.deepEqual(material.parameters({...options,seed:7}),material.parameters({...options,seed:7}));
});

test('traveling ripples have accurate normals across different bubble personalities', () => {
  const epsilon=1e-5;
  for(let seed=0;seed<8;seed++){
    const p=material.parameters({seed,age:3.2,wind:.8,pressure:.18});
    for(let i=0;i<64;i++){
      const n=directionAt(i,64), tangent=unit(cross(Math.abs(n[1])<.9?[0,1,0]:[1,0,0],n)),bitangent=cross(n,tangent);
      const derivative=t=>sub(position(add(n,mul(t,epsilon)),p),position(sub(n,mul(t,epsilon)),p));
      const numeric=unit(cross(derivative(tangent),derivative(bitangent)));
      assert(dot(numeric,material.sampleSurface(n,{parameters:p}).normal)>1-1e-9);
    }
  }
});

test('wind changes the surface and individualized deformation stays subtle', () => {
  let difference=0;
  for(let seed=0;seed<12;seed++){
    const calm=material.parameters({seed,age:4,wind:0});
    const blown=material.parameters({seed,age:4,wind:1});
    let volume=0;
    for(let i=0;i<1000;i++){
      const n=directionAt(i,1000),radius=Math.hypot(...position(n,blown));
      assert(radius>.85&&radius<1.15);
      volume+=radius**3;
      difference+=Math.hypot(...sub(position(n,calm),position(n,blown)));
    }
    assert(Math.abs(volume/1000-1)<.02);
  }
  assert(difference>10);
});

let failed=0;
for(const [name,fn] of tests){try{fn();console.log(`PASS ${name}`);}catch(error){failed++;console.error(`FAIL ${name}\n${error.stack}`);}}
console.log(`${tests.length-failed}/${tests.length} geometry checks passed`);
process.exitCode=failed?1:0;
