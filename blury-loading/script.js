const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.bg');
const button = document.querySelector('button');
let load = 0;

let int = setInterval(blurring, 30);

function blurring() {
  load++
if(load > 99) {
  clearInterval(int);
  if (window.frameElement !=null) {
    setTimeout(()=> {
      button.classList.remove('hidden');
      button.addEventListener('click', () => {
        button.classList.add('hidden');
        setTimeout(()=>location.reload(), 1500); // allow to reload if in iframe
      } , 3000)

    }, 3000)
  }
}
loadText.innerText = `${load}%`;
// loadText.style.opacity = 1 - (load/100); // My simple solution
loadText.style.opacity = scale(load,0,100,1,0);
bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}


///const scale = (num, in_min, in_max, out_min, out_max) => {
//  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;}
// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function scale (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}