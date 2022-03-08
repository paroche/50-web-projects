// Switch to full screen in iframe
// const elem = document.documentElement;
document.documentElement.addEventListener('dblclick', () => {
  if (window.frameElement != null) document.documentElement.requestFullscreen();
}); 

//   <script src="../iframe-full.js"></script>