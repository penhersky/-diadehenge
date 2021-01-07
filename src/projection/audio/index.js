import * as three from 'three';

const audio = (camera, path, voice = 0.5, play = true) => {
  const listener = new three.AudioListener();
  camera.add(listener);
  console.log(play);
  const sound = new three.Audio(listener);

  const audioLoader = new three.AudioLoader();
  audioLoader.load(path, (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(voice);

    if (play) {
      sound.play();
    } else {
      sound.pause();
    }
  });
};

export default audio;
