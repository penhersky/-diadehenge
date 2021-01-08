import * as three from 'three';
import Stats from 'stats-js';

import { createControls } from './controls';
import place from './place';
import { Pillar } from './model';

import img4 from '../assets/stone/stone5.jpg';
import img5 from '../assets/stone/stone6.jpg';

const stats = new Stats();
stats.showPanel(1);
document.body.appendChild(stats.dom);

let camera;
let scene;
let renderer;
let control;

function animation() {
  stats.begin();

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

  // place
  place(scene, 40, 20);

  // models
  // left
  scene.add(Pillar(img5, 2.3, 1));
  scene.add(Pillar(img4, 0.5, 1.6));
  scene.add(Pillar(img5, 0.8, 2.5));
  scene.add(Pillar(img4, 2.2, 3));
  // right
  scene.add(Pillar(img4, 5.8, 1.2));
  scene.add(Pillar(img5, 4.2, 2));
  scene.add(Pillar(img5, 6, 3));
  scene.add(Pillar(img4, 7, 2.2));

  // light
  const light = new three.AmbientLight('#EEEEEE', 0.6); // soft white light
  scene.add(light);

  const axesHelper = new three.AxesHelper(5);
  if (process.env.NODE_ENV === 'development') scene.add(axesHelper);

  renderer = new three.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  renderer.domElement.id = 'scene';
  if (document.getElementById('scene'))
    document.body.removeChild(document.getElementById('scene'));
  document.body.appendChild(renderer.domElement);
  control = createControls(camera, renderer);
}

export default init;
