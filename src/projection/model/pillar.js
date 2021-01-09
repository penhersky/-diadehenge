import * as three from 'three';

const pillar = (
  img,
  x = 0,
  z = 0,
  castShadow = true,
  width = 0.2,
  height = 0.8,
) => {
  const texture = [
    new three.MeshLambertMaterial({
      map: new three.TextureLoader().load(img),
      side: three.FrontSide,
    }),
    new three.MeshLambertMaterial({
      map: new three.TextureLoader().load(img),
      side: three.FrontSide,
    }),
    new three.MeshLambertMaterial({
      map: new three.TextureLoader().load(img),
      side: three.FrontSide,
    }),
    new three.MeshLambertMaterial({
      map: new three.TextureLoader().load(img),
      side: three.FrontSide,
    }),
    new three.MeshLambertMaterial({
      map: new three.TextureLoader().load(img),
      side: three.FrontSide,
    }),
    new three.MeshLambertMaterial({
      map: new three.TextureLoader().load(img),
      side: three.FrontSide,
    }),
  ];

  const geometry = new three.BoxGeometry(width, height, 0.2);

  const mesh = new three.Mesh(geometry, texture);
  mesh.position.x = x;
  mesh.position.z = z;
  mesh.position.y = height / 2;
  mesh.castShadow = castShadow;
  mesh.receiveShadow = true;
  return mesh;
};

export default pillar;
