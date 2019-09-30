{/* <script> */ }
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
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

// creating the sphere
// let geometry = new THREE.SphereGeometry(5, 32, 32);
let geometry = new THREE.CubeGeometry(LENGTH, HEIGHT, WIDTH);
let cubeMaterial = [
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./asset/fakes_death.jpg'), side: THREE.DoubleSide}), // right side
  // new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }), // right side
  new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('./asset/rachal_mcadams.jpg'), side: THREE.DoubleSide }), // left side
  new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./asset/samurai_jack.jpg'), side: THREE.DoubleSide }), // top side
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./asset/shrek.jpg'), side: THREE.DoubleSide }), // bottom side
  new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./asset/used_to_be_cool.jpg'), side: THREE.DoubleSide }), // front side
  new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('./asset/what_is_this.jpg'), side: THREE.DoubleSide }), // back side
];

let ambientLight = new THREE.AmbientLight(0x00ff00, 2);
scene.add(ambientLight);

// Create a material, image or color texture
// let material = new THREE.MeshBasicMaterial({color: 0xabcdef, wireframe: true});
let material = new THREE.MeshFaceMaterial(cubeMaterial);
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 10;

// game logic
let update = () => {
  // cube.rotation.x += 0.001;
  // cube.rotation.y += 0.0005;
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