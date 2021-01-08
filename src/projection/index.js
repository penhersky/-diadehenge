import * as three from 'three';
import Stats from 'stats-js';

import { createControls } from './controls';
import place from './place';

import audio from './audio';
import sound from './audio/audio.mp3';

const stats = new Stats();
stats.showPanel(1);
document.body.appendChild(stats.dom);

let camera;
let scene;
let renderer;
let geometry;
let material;
let mesh;
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

  scene = new three.Scene();

  // place
  place(scene, 10, 10);

  geometry = new three.BoxGeometry(0.2, 0.2, 0.2);
  material = new three.MeshLambertMaterial();

  mesh = new three.Mesh(geometry, material);
  scene.add(mesh);

  // light
  const light = new three.AmbientLight('#EEEEEE', 0.7); // soft white light
  scene.add(light);

  // audio
  // audio(camera, sound, 0.1);

  const axesHelper = new three.AxesHelper(5);
  scene.add(axesHelper);

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
