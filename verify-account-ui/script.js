// Switch to full screen in iframe
const elem = document.documentElement;
elem.addEventListener('dblclick', () => {
  if (window.frameElement != null) elem.requestFullscreen();
}); 

const codes = document.querySelectorAll('.code');

codes[0].focus();

codes.forEach((code, idx) => {
  code.addEventListener('keydown', (e) => {
    if(e.key >= 0 && e.key <=9) {
      codes[idx].value = ''; // keeps from adding to what's already there, but do have to retype # if want to keep it.
      setTimeout(() =>codes[idx+1].focus(), 10); // w/out delay, input doesn't go into current field
    } else if(e.key==='Backspace') {
      setTimeout(() =>codes[idx-1].focus(), 10); // w/out delay, input doesn't go into current field
    }
  })
})