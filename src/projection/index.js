import * as three from 'three';
import Stats from 'stats-js';

import store from '../redux/store';

import { createControls } from './controls';
import place from './place';

import { Pillar, smallStone, mtlObj } from './model';

import audioPlay from './audio';
import audio from './audio/audio.mp3';

import { Bullet } from './light';
import { lightPosition, modelPosition, stonePosition } from './positions';

import logic from './logic';
import { orbitCalculation } from './animation/circleAction';

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
let fog;

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

  if (settings.fog) {
    if (!scene.fog) scene.fog = fog;
  } else scene.fog = null;

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

  // fog
  fog = new three.Fog('lightblue', 1, 7);
  scene.fog = fog;

  // models
  pillars = [...modelPosition.pillar.map(({ x, z }) => Pillar('', x, z))];
  scene.add(...pillars);
  scene.add(Pillar('', 4.2, 2, false));

  stonePosition.small.map(({ x, rotateX, rotateY, z }) =>
    smallStone(scene, { x, z }, rotateX, rotateY),
  );

  mtlObj('', '', (object) => {
    scene.add(object);
  }); // temp

  // light
  const light = new three.AmbientLight(
    variables.light.color.global,
    variables.light.intensity.global,
  ); // soft white light
  scene.add(light);

  const spotLight = new three.SpotLight(variables.light.color.global, 0.3);
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
