// My code before watching video
const button = document.getElementById('btn');
const boxes = document.getElementById('boxes');

const gifs = [
'https://media.giphy.com/media/EZqwsBSPlvSda/giphy.gif',
'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif',
'https://media.giphy.com/media/xTiTnK5ALNxNx4FiBG/giphy.gif',
'https://media.giphy.com/media/9FZkGJyITMk1LUKRvK/giphy.gif',
'https://media.giphy.com/media/cCbhtlc1p3UYlldT6t/giphy.gif',
'https://media.giphy.com/media/e6pVxN3fY5Wla/giphy.gif',
'https://media.giphy.com/media/jS6sVMK2fu4Uw/giphy.gif',
'https://media.giphy.com/media/noD1VifjaczbG/giphy.gif',
'https://media.giphy.com/media/A6aHBCFqlE0Rq/giphy.gif',
'https://media.giphy.com/media/mIZ9rPeMKefm0/giphy.gif',
'https://media.giphy.com/media/JMotSbZTCEWl2/giphy.gif',
'https://media.giphy.com/media/l0IxZ60aHccYIKMuI/giphy.gif',
'https://media.giphy.com/media/KEtgWlYYoN6Ni/giphy.gif',
'https://media.giphy.com/media/A4u4aw3brQptC/giphy.gif',
'https://media.giphy.com/media/uA6sERHUlCXYI/giphy.gif',
'https://media.giphy.com/media/cI6Qfr0bWjDWM/giphy.gif',
'https://media.giphy.com/media/112YlbxHDV9PDq/giphy.gif',
'https://media.giphy.com/media/PHY2NoM2suoxi/giphy.gif',
'https://media.giphy.com/media/6UWZ61yysjnjy/giphy.gif',
'https://media.giphy.com/media/10LNj580n9OmiI/giphy.gif',
'https://media.giphy.com/media/T9wQWimOZa1tS/giphy.gif',
'https://media.giphy.com/media/4ZFrbrZy7N4aTXSe6t/giphy.gif',
'https://media.giphy.com/media/kGdF57DY1jHQb5k2Mq/giphy.gif',
'https://media.giphy.com/media/T2yS5UokOK24ixY1Yw/giphy.gif',
'https://media.giphy.com/media/2m0nyHcVuwL7faEiU2/giphy.gif',
'https://media.giphy.com/media/5nmp9TVwHSXPaDolIX/giphy.gif',
'https://media.giphy.com/media/Mt0IKnQaKdSTu/giphy.gif',
'https://media.giphy.com/media/xT9Igix0cQtPCKSvV6/giphy.gif',
'https://media.giphy.com/media/3ohhwoyHMhQPbb23oA/giphy.gif',







];

const gifUrl = `url("${gifs[Math.floor(Math.random()*gifs.length)]}")`;

button.addEventListener('click', ()=> {
  boxes.classList.toggle('big');
})

// my guess is he will make this a function
for (let row = 0; row<4; row++) {
  for (let column=0; column<4; column++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.style.backgroundPosition = `${-125*column}px ${-125*row}px`;
    box.style.backgroundImage = gifUrl;
    boxes.appendChild(box);
  }
}



/*
<div style="width:480px"><iframe allow="fullscreen" frameBorder="0" height="270" src="https://giphy.com/embed/s1j08YJFobBvQuzPLK/video" width="480"></iframe></div>
*/

// Brad's code

// const boxesContainer = document.getElementById('boxes');
// const btn = document.getElementById('btn');

// btn.addEventListener('click', ()=> boxesContainer.classList.toggle('big')
// )

// function createBoxes() {
// for(let i = 0; i<4; i++) {
//   for(let j = 0; j<4; j++) {
//     const box = document.createElement('div');
//     box.classList.add('box');
//     box.style.backgroundPosition = `${-j*125}px ${-i*125}px`;
//     boxesContainer.appendChild(box);
//   }
// }
// }

// createBoxes();
