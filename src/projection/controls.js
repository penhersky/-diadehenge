import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// eslint-disable-next-line import/prefer-default-export
export function createControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.update();
  return controls;
}
