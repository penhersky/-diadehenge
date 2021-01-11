import * as three from 'three';

import variables from '../../variables';

const bullet = (x, y, z, castShadow = true) => {
  const bulbGeometry = new three.IcosahedronBufferGeometry(0.04, 16, 8);
  const bulbLight = new three.PointLight(
    variables.light.color.primary,
    5,
    2,
    3,
  );

  const bulbMat = new three.MeshLambertMaterial({
    emissive: '#0096F5',
    emissiveIntensity: 4,
    refractionRatio: 0.95,
    transmission: 0.9,
    transparent: true,
    opacity: 0.8,
    color: '#0096F5',
  });

  bulbLight.add(new three.Mesh(bulbGeometry, bulbMat));
  bulbLight.position.set(x, y, z);
  bulbLight.castShadow = castShadow;
  return bulbLight;
};

export default bullet;
