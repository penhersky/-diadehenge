import * as three from 'three';
import Stats from 'stats-js';

import { createControls } from './controls';
import place from './place';

import { Pillar } from './model';
import { Bullet } from './light';

import logic from './logic';

import img4 from '../assets/stone/stone5.jpg';
import img5 from '../assets/stone/stone6.jpg';

import variables from '../variables';

const stats = new Stats();
stats.showPanel(1);
document.body.appendChild(stats.dom);

let camera;
let scene;
let renderer;
let control;
let lights = [];

function animation() {
  stats.begin();

  logic();
  const time = Date.now() * 0.0005;
  lights.map((light) => (light.position.y = Math.cos(time) * 0.75 + 1.25));
  control.update();

  stats.end();
  renderer.render(scene, camera);
}

function init() {
  camera = new three.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10,
  );
  camera.position.z = 2;
  camera.position.y = 2;

  scene = new three.Scene();

  // ground
  place(scene, 16, 8, 0.5, 0.5);

  // models
  // left
  scene.add(Pillar(img5, 2.3, 1));
  scene.add(Pillar(img4, 0.5, 1.6));
  scene.add(Pillar(img5, 0.8, 2.5));
  scene.add(Pillar(img4, 2.2, 3));
  // right

  scene.add(Pillar(img4, 5.8, 1.2));
  scene.add(Pillar(img5, 4.2, 2, false));
  scene.add(Pillar(img5, 6, 3));
  scene.add(Pillar(img4, 7, 2.2));

  // light
  const light = new three.AmbientLight(
    variables.light.color.global,
    variables.light.intensity.global,
  ); // soft white light
  scene.add(light);

  const spotLight = new three.SpotLight(variables.light.color.global, 0.2);
  spotLight.position.set(100, 1000, 100);

  scene.add(spotLight);

  lights.push(Bullet(1.2, 0.6, 2));
  lights.push(Bullet(3.5, 0.4, 1));
  lights.push(Bullet(5, 0.4, 2));
  lights.push(Bullet(6.5, 0.2, 1.6));
  scene.add(...lights);

  const axesHelper = new three.AxesHelper(5);
  if (process.env.NODE_ENV === 'development') scene.add(axesHelper);

  renderer = new three.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  renderer.shadowMap.enabled = true;
  renderer.domElement.id = 'scene';
  if (document.getElementById('scene'))
    document.body.removeChild(document.getElementById('scene'));
  document.body.appendChild(renderer.domElement);
  control = createControls(camera, renderer);
  window.addEventListener('resize', onWindowResized, false);
}

function onWindowResized() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

export default init;
