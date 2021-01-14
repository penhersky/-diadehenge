import * as three from 'three';
import Stats from 'stats-js';

import store from '../redux/store';

import { createControls } from './controls';
import place from './place';

import { Pillar, smallStone } from './model';

import audioPlay from './audio';
import audio from './audio/audio.mp3';

import { Bullet } from './light';
import { lightPosition, modelPosition } from './positions';

import logic from './logic';
import { orbitCalculation } from './animation/circleAction';

import img5 from '../assets/stone/stone6.jpg';

import variables from '../variables';

const stats = new Stats();
stats.showPanel(1);
document.body.appendChild(stats.dom);

let camera;
let scene;
let renderer;
let control;
let sound;
let lights = [];
let pillars = [];

function animation() {
  stats.begin();
  const settings = store.getState().settings;

  logic();
  if (settings.animations) {
    const result = orbitCalculation(0.4);
    lights.map((l, i) => {
      l.position.x = lightPosition.bullet[i].x + result.x;
      l.position.z = lightPosition.bullet[i].z + result.z;
      return l;
    });
  }

  pillars.map((model) => (model.castShadow = settings.shadows));

  if (settings.sound) {
    sound?.play();
  } else {
    sound?.pause();
  }

  control.update();

  stats.end();
  renderer.render(scene, camera);
}

async function init() {
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
  pillars = [...modelPosition.pillar.map(({ x, z }) => Pillar(img5, x, z))];
  scene.add(...pillars);
  scene.add(Pillar(img5, 4.2, 2, false));

  smallStone(scene, { x: 0.5, z: 2.8 }, 60, 10);
  smallStone(scene, { x: 1.2, z: 0.5 }, 60, 60);
  smallStone(scene, { x: 2.1, z: 1.7 });
  smallStone(scene, { x: 3.2, z: 1.2 }, 10, 60);
  smallStone(scene, { x: 4.2, z: 2.7 }, 30);
  smallStone(scene, { x: 5.2, z: 1.7 }, 90);
  smallStone(scene, { x: 6.2, z: 1.1 }, 40);

  // light
  const light = new three.AmbientLight(
    variables.light.color.global,
    variables.light.intensity.global,
  ); // soft white light
  scene.add(light);

  const spotLight = new three.SpotLight(variables.light.color.global, 0.2);
  spotLight.position.set(100, 1000, 100);
  scene.add(spotLight);

  lights = [...lightPosition.bullet.map(({ x, y, z }) => Bullet(x, y, z))];
  scene.add(...lights);

  // sound
  sound = await audioPlay(camera, audio);

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
