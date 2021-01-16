import * as three from 'three';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';

import manager from '../loadManager';

import model from '../../assets/model/rock2.obj';
import img from '../../assets/textures/rock.png';

const stone = (scene, { x = 0, z = 0 }, rotateX = 0, rotateY = 0) => {
  const loader = new OBJLoader2(manager);

  loader.load(model, async (object) => {
    object.position.z = z;
    object.position.x = x;
    object.position.y = 0;
    object.rotateX(three.Math.degToRad(rotateX));
    object.rotateY(three.Math.degToRad(rotateY));
    const size = Math.random() / 100;
    object.scale.setX(0.01 + size);
    object.scale.setZ(0.01 + size);
    object.scale.setY(0.01 + size);
    object.castShadow = true;
    const textureLoader = new three.TextureLoader(manager);
    const texture = await textureLoader.loadAsync(img);
    const material = new three.MeshLambertMaterial({
      map: texture,
    });
    object.traverse((node) => {
      node.material = material;
      scene.add(object);
    });
  });
};

export default stone;
