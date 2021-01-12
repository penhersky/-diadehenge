import * as three from 'three';

const audio = async (camera, path, voice = 0.5) => {
  const listener = new three.AudioListener();
  camera.add(listener);
  const sound = new three.Audio(listener);

  const audioLoader = new three.AudioLoader();
  const buffer = await audioLoader.loadAsync(path);
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(voice);
  sound.autoplay = true;
  return sound;
};

export default audio;
