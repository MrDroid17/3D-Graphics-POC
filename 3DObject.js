{/* <script> */ }
let box_status;
let box_state = false;
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.background = new THREE.Color('gray');
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

// add listener to resize
window.addEventListener('dblclick', () => {
  if (box_status == undefined) {
    box_status = false;
  }
  else if (box_state == false) {
    box_status = false;
  }
  else if (box_state == true) {
    box_status = true;
  }
  console.log('************************ Box status **************************', box_status);
})
// controls
control = new THREE.OrbitControls(camera, renderer.domElement);
const LENGTH = 10;
const HEIGHT = 2;
const WIDTH = 8;
const THICKNESS = 0.1;
const ROTATION_ANGLE_IN_RADIAN = 0.005;

// 3D Objects
let rside = new THREE.Object3D();   // for righ
let lside = new THREE.Object3D();   // for left
let tside = new THREE.Object3D();   // for top
let btside = new THREE.Object3D();  // for bottom
let fside = new THREE.Object3D();   // for front
let bside = new THREE.Object3D();   // for back
let toprightside = new THREE.Object3D();   // for back

camera.position.z = 13;
camera.position.y = 2;
camera.position.x = -2;


const loadManager = new THREE.LoadingManager();
let texture01 = new THREE.TextureLoader().load('asset/carton_color.jpg');
let texture02 = new THREE.TextureLoader().load('asset/carton_side.jpg');
let texture03 = new THREE.TextureLoader().load('asset/texture06.jpg');

let topMaterial = [
  new THREE.MeshLambertMaterial({ map: texture03, side: THREE.DoubleSide }), // right side
  new THREE.MeshLambertMaterial({ map: texture03, side: THREE.DoubleSide }), // left side
  new THREE.MeshLambertMaterial({ map: texture03, side: THREE.DoubleSide }), // top side
  new THREE.MeshLambertMaterial({ map: texture03, side: THREE.DoubleSide }), // bottom side
  new THREE.MeshLambertMaterial({ map: texture03, side: THREE.DoubleSide }), // front side
  new THREE.MeshLambertMaterial({ map: texture03, side: THREE.DoubleSide }), // back side
];

let rSideMaterial = [
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // right side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // left side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // top side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // bottom side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // front side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // back side
];

let bottomMaterial = [
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // right side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // left side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // top side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // bottom side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // front side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // back side
];

let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


bottomSide();
rightSide();

function bottomSide() {
  // bottom
  let geometry = new THREE.BoxBufferGeometry(LENGTH, THICKNESS, WIDTH);
  // let material = new THREE.MeshFaceMaterial(cubeMaterial);
  let bottom = new THREE.Mesh(geometry, bottomMaterial);
  bottom.position.set(0, -1, 0);
  scene.add(bottom);
}

function rightSide() {
  // right side
  let geometry = new THREE.BoxBufferGeometry(THICKNESS, HEIGHT, WIDTH);
  // let material = new THREE.MeshFaceMaterial(cubeMaterial);
  let right_side = new THREE.Mesh(geometry, rSideMaterial);

  // rside.rotation.z = -Math.PI/2;
  right_side.position.y = 1;
  scene.add(rside);
  rside.add(right_side);
  rside.position.x = 5;
  rside.position.y = -1;

  let geometry2 = new THREE.BoxBufferGeometry(LENGTH, THICKNESS, WIDTH);
  let top_side = new THREE.Mesh(geometry2, topMaterial);
  top_side.position.y = 0;
  top_side.position.x = -5;

  scene.add(tside);
  tside.add(top_side)
  tside.position.y = 1;
  tside.position.x = 5;

  scene.add(toprightside);
  toprightside.add(tside);
  tside.position.y = -3;
  tside.position.x = 0.8;
  rside.position.y = -5;
  rside.position.x = -1;
  toprightside.add(rside);
  toprightside.position.x = 6;
  toprightside.position.y = 4;
  tside.rotation.z = -3 * Math.PI/4;
  rside.rotation.z = -Math.PI/4;
}


// Draw Scene
let render = () => {
  renderer.render(scene, camera);
}

// run game loop(update, render, repeat)
let GameLoop = () => {
  requestAnimationFrame(GameLoop);

  render();
}
//update();
GameLoop()
// </script>