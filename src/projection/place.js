import * as three from 'three';

import img from '../assets/ground.jpg';

const place = (scene, col, row = 1, width = 0.2, hight = 0.2) => {
  const texture = new three.TextureLoader().load(img);
  for (let i = 0; i < row; i++) {
    for (let index = 0; index < col; index++) {
      const placeGeometry = new three.PlaneGeometry(width, hight, 32);
      const placeMaterial = new three.MeshLambertMaterial({
        map: texture,
        side: three.DoubleSide,
      });
      const p = new three.Mesh(placeGeometry, placeMaterial);
      p.rotation.x = three.Math.degToRad(-90);
      p.position.setX(index * width);
      p.position.setZ(i * hight);
      scene.add(p);
    }
  }
};

export default place;
