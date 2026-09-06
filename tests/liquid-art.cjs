"use strict";
const assert = require("node:assert/strict");
const LiquidArt = require("../liquid-art.js");
let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`PASS ${name}`); }

test("live advection changes both the surface and its computed illumination", () => {
  const a = new LiquidArt(40, 68), initial = a.surface.slice(), light = a.light.slice();
  for (let i=1;i<=180;i++) a.advance(i/30);
  let displacement=0, lightingChange=0;
  for(let i=0;i<initial.length;i++){
    displacement+=Math.abs(a.surface[i]-initial[i]);
    lightingChange+=Math.abs(a.light[i]-light[i]);
    assert(Number.isFinite(a.surface[i])&&Math.abs(a.surface[i])<=1);
    assert(a.light[i]>=.65&&a.light[i]<=1.301);
  }
  assert(displacement/initial.length>.04);
  assert(lightingChange/initial.length>.02);
  assert.equal(a.steps,180);
});

test("the previous surface affects later frames instead of being replaced by a time lookup", () => {
  const a=new LiquidArt(40,68),b=new LiquidArt(40,68);
  for(let y=22;y<38;y++)for(let x=12;x<25;x++)b.surface[y*40+x]+=.12;
  for(let i=1;i<=30;i++){a.advance(i/30);b.advance(i/30);}
  const residual=a.surface.reduce((sum,value,i)=>sum+Math.abs(value-b.surface[i]),0);
  assert(residual>8);
});

test("fixed simulation steps agree at 20, 30 and 60 display frames per second", () => {
  const fields=[20,30,60].map(fps=>{const a=new LiquidArt(24,40);for(let i=1;i<=fps*4;i++)a.advance(i/fps);return a;});
  for(const a of fields){assert.equal(a.steps,120);assert.deepEqual(a.surface,fields[0].surface);}
});

test("pause, reduced motion and time jumps avoid simulation catch-up bursts", () => {
  const a=new LiquidArt(24,40);a.advance(1/30);
  const before=a.surface.slice();a.advance(1/30);assert.deepEqual(a.surface,before);
  for(let i=2;i<10;i++)a.advance(i/30,true);
  assert.deepEqual(a.surface,before);
  a.advance(100);assert.equal(a.steps,0);assert.equal(a.time,100);
  a.advance(0);assert.equal(a.steps,0);assert(a.light.every(Number.isFinite));
});

test("maximum rendering resolution keeps diffusion bounded", () => {
  const a=new LiquidArt(174,310);
  for(let i=1;i<=40;i++)a.advance(i/30);
  assert(a.surface.every(v=>Number.isFinite(v)&&Math.abs(v)<=1));
  assert(a.light.every(v=>v>=.65&&v<=1.301));
});
console.log(`${passed}/${passed} flow simulation checks passed.`);
