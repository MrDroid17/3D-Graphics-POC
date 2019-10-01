{/* <script> */ }
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.background = new THREE.Color( 'skyblue' );
let renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);

// add listener to resize
window.addEventListener('resize', () => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
})


// controls
control = new THREE.OrbitControls(camera, renderer.domElement);
const LENGTH = 10;
const HEIGHT = 3;
const WIDTH = 8;

var geometry = new THREE.PlaneGeometry( 6,8);
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var base = new THREE.Mesh( geometry, material );
scene.add( cover );

var geometry = new THREE.PlaneGeometry( 6,8);
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var side = new THREE.Mesh( geometry, material );
scene.add( side );

camera.position.z = 10;



// game logic
let update = (x,y,z) => {
  cover.rotation.x += 0.01;
  cover.rotation.y += 0.01;
  cover.rotation.z += 0.01;
};

// Draw Scene
let render = () => {
  renderer.render(scene, camera);
}

// run game loop(update, render, repeat)
let GameLoop = () => {
  requestAnimationFrame(GameLoop);
  update();
  render();
}

GameLoop()
// </script>