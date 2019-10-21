{/* <script> */ }
let box_status = false;
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.background = new THREE.Color('skyblue');
// scene.overrideMaterial = new THREE.MeshLambertMaterial();

let renderer = new THREE.WebGLRenderer({ antialias: true });
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
const THICKNESS = 0.05;

// camera position
camera.position.z = 10;

// bottom
let bt_geometry = new THREE.BoxBufferGeometry(LENGTH, THICKNESS, WIDTH);
let bt_material = new THREE.MeshBasicMaterial({ color: 0x0ff0ff, side: THREE.DoubleSide });
let bottom = new THREE.Mesh(bt_geometry, bt_material);
bottom.position.set(0, -1.5, 0);
scene.add(bottom);



// run game loop(update, render, repeat) to animate
let GameLoop = () => {
  requestAnimationFrame(GameLoop);
  render();
}
// Draw Scene
let render = () => {
  renderer.render(scene, camera);
}

//update();
GameLoop();
// </script>