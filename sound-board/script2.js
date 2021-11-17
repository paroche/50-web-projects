// Alternate version where all sound file info is in js, so only change in one place. Remmed out parts if files have different names than buttons, otherwise use soundPrefix + sound + .mp3
const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory'
, 'wrong'];
// const soundFiles = ['sounds/sound-board_sounds_applause.mp3', 'sounds/sound-board_sounds_boo.mp3','sounds/sound-board_sounds_gasp.mp3','sounds/sound-board_sounds_tada.mp3','sounds/sound-board_sounds_victory.mp3' ,'sounds/sound-board_sounds_wrong.mp3'];
const soundFiles = [];
const soundPrefix = 'sounds/sound-board_sounds_';

sounds.forEach((sound, idx) => {
  const btn = document.createElement('button');
  btn.classList.add('btn');
  btn.innerText = sound;
  btn.addEventListener('click', () => {
    stopSongs();
    document.getElementById(sound).play()
  });
  document.getElementById('buttons').appendChild(btn);
  const audio = document.createElement('audio');
  audio.id = sound;
  // audio.src = soundFiles[idx];
  audio.src = soundPrefix + sound + '.mp3';
  document.getElementById('sounds').appendChild(audio);
})

function stopSongs() {
  sounds.forEach(sound => {
    const song = document.getElementById(sound);
    song.pause();
    song.currentTime = 0;
  })
}