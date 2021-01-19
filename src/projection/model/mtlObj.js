import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import manager from '../loadManager';

const obj = (obj, materials, callback, scale = 1, { x = 1, z = 2, y }) => {
  const mtlLoader = new MTLLoader(manager);
  const objLoader = new OBJLoader(manager);
  mtlLoader.load(materials, (material) => {
    material.preload();
    objLoader.setMaterials(material);
    objLoader.load(obj, function (object3d) {
      object3d.scale.setX(scale);
      object3d.scale.setZ(scale);
      object3d.scale.setY(scale);
      object3d.position.x = x;
      object3d.position.z = z;
      object3d.position.y = y;
      object3d.castShadow = true;
      callback(object3d);
    });
  });
};

export default obj;
