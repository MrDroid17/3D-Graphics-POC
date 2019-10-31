let scene = new THREE.Scene();

const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 25;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load('./asset/house.jpg');
scene.background = bgTexture;

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);

const d = 0.8;

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


// camera position
camera.position.z = 4;

addLight(-1, 2, 4);
addLight( 1, -1, -2);

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);


makeInstance(geometry, hsl(0 / 8, 1, .5), -d, -d, -d);
makeInstance(geometry, hsl(1 / 8, 1, .5),  d, -d, -d);
makeInstance(geometry, hsl(2 / 8, 1, .5), -d,  d, -d);
makeInstance(geometry, hsl(3 / 8, 1, .5),  d,  d, -d);
makeInstance(geometry, hsl(4 / 8, 1, .5), -d, -d,  d);
makeInstance(geometry, hsl(5 / 8, 1, .5),  d, -d,  d);
makeInstance(geometry, hsl(6 / 8, 1, .5), -d,  d,  d);
makeInstance(geometry, hsl(7 / 8, 1, .5),  d,  d,  d);

function addLight(...pos){
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(...pos);
  scene.add(light);
}

function makeInstance(geometry, color, x, y, z){
  const material = new THREE.MeshPhongMaterial({
    color,
    opacity: 0.5,
    transparent: true,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.set(x, y, z);
  return cube;
}

function hsl(h, s, l) {
  return (new THREE.Color()).setHSL(h, s, l);
}

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