import * as three from 'three';

import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';

import variables from '../../variables';

import img1 from '../../assets/lentsFlare/1.png';
import img2 from '../../assets/lentsFlare/2.png';

const bullet = (x, y, z, castShadow = true) => {
  const bulbGeometry = new three.IcosahedronBufferGeometry(0.02, 16, 8);
  const bulbLight = new three.PointLight(
    variables.light.color.primary,
    5,
    2,
    3,
  );

  const textureLoader = new three.TextureLoader();

  const textureFlare0 = textureLoader.load(img1);
  const textureFlare3 = textureLoader.load(img2);

  const bulbMat = new three.MeshLambertMaterial({
    emissive: '#26A6F5',
    emissiveIntensity: 4,
    refractionRatio: 0.95,
    opacity: 0.8,
    color: '#26A6F5',
  });

  bulbLight.add(new three.Mesh(bulbGeometry, bulbMat));
  bulbLight.position.set(x, y, z);
  bulbLight.castShadow = castShadow;
  const lensflare = new Lensflare();
  lensflare.addElement(new LensflareElement(textureFlare0, 70, 0));
  lensflare.addElement(new LensflareElement(textureFlare3, 10, 0.6));
  lensflare.addElement(new LensflareElement(textureFlare3, 12, 0.7));
  lensflare.addElement(new LensflareElement(textureFlare3, 20, 0.9));
  lensflare.addElement(new LensflareElement(textureFlare3, 11, 1));
  bulbLight.add(lensflare);
  bulbLight.shadow.mapSize.width = 424;
  bulbLight.shadow.mapSize.height = 424;
  bulbLight.shadow.camera.near = 0.1;
  bulbLight.shadow.camera.far = 10;
  bulbLight.penumbra = 0.2;
  return bulbLight;
};

export default bullet;
