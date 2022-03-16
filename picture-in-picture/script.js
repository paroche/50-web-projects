/** @format */

// Modified to require button press to select source so won't do on load. Much better for iFram menu
// Streamlined

const videoElement = document.getElementById('video');
const sourceButton = document.getElementById('source-button'); // Original had this selection run on load. Inconvenient for ifram menu
const startButton = document.getElementById('start-button'); // Seem to need to have button for user to click. Picture-in-picture requires user action

// Switch to full screen in iframe
// const elem = document.documentElement;
// elem.addEventListener('dblclick', () => {
//   if (window.frameElement != null) elem.requestFullscreen();
// }); 

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = async() => {
      videoElement.play();
    };
  } catch (error) {
    console.log('error on selectMediaStream:', error);
  }
}

sourceButton.addEventListener('click', ()=> selectMediaStream());

startButton.addEventListener('click', async() => {
  startButton.disabled = true;
  await videoElement.requestPictureInPicture();
  startButton.disabled = false;
});

// On Load
// selectMediaStream();