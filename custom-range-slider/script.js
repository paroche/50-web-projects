/** @format */

const range = document.getElementById('range');

range.addEventListener('input', (e) => {
  const value = +e.target.value;
  const label = e.target.nextElementSibling;

  const range_width = getComputedStyle(e.target).getPropertyValue('width'); // 300px or whatever we set in CSS
  const label_width = getComputedStyle(label).getPropertyValue('width'); // 300px or whatever we set in CSS

  const num_width = +range_width.substring(0, range_width.length - 2); // to get 'px' off end. Could need some more flexible code, e.g up to 1st non-numeric value, so could use other units
  const num_label_width = +label_width.substring(0, label_width.length - 2);

  const max = +e.target.max;
  const min = +e.target.min;

  const thumb_width = 24; // hard coding this

  // const left = value * (num_width / max) - num_label_width / 2; // original. Lines up w/ bar, but doesn't account for thumb width (not at center of thumb).
  // const left = value * (num_width / max) - num_label_width / 2 + scale(value, min, max, 10, -10); // His solution using the scale function from stackoverflow. Don't know where 10, -10 come from, but it works.
  const left = (value * (num_width / max) - num_label_width / 2) + ((max/2 - value) * 3*thumb_width/num_width); // I came with this. Works perfectly, but I don't know why

  // console.log(left); // -40 to 260. Label width is 80, slider width is 300
  label.style.left = left + 'px'; // this works
  // label.style.left = `${left}px`; // his way. Works too
  label.innerHTML = value;
});

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}