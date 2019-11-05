{/* <script> */ }
let box_status = false;
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
// window.addEventListener('dblclick', () => {
//  alert('yo')
// })


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

camera.position.z = 15;
camera.position.y = 4;
camera.position.x = -2;


const loadManager = new THREE.LoadingManager();
let texture01 = new THREE.TextureLoader().load('asset/carton_color.jpg');
let texture02 = new THREE.TextureLoader().load('asset/carton_side.jpg');
let texture03 = new THREE.TextureLoader().load('asset/carton_side02vertical.jpg');

let topMaterial = [
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // right side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // left side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // top side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // bottom side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // front side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // back side
];

let leftSideMaterial = [
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // right side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // left side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // top side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // bottom side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // front side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // back side
];
let rightSideMaterial = [
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // right side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // left side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // top side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // bottom side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // front side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // back side
];

let bottomMaterial = [
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // right side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // left side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // top side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // bottom side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // front side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // back side
];
let frontMaterial = [
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // right side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // left side
  new THREE.MeshLambertMaterial({ map: texture02, side: THREE.DoubleSide }), // top side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // bottom side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // front side
  new THREE.MeshLambertMaterial({ map: texture01, side: THREE.DoubleSide }), // back side
];


let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// let ambientLight2 = new THREE.AmbientLight(0xffffff, 0.5);
// ambientLight2.position.x = 16;
// ambientLight2.position.y = 16;
// ambientLight2.position.z = 16;
// scene.add(ambientLight2);


// loadManager.onLoad = () => {

//   bottomSide();
//   rightSide();
//   leftSide();
//   frontSide();
//   backSide();
//   topSide();
// };

bottomSide();
rightSide();
leftSide();
frontSide();
backSide();
topSide();



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
  let right_side = new THREE.Mesh(geometry, rightSideMaterial);

  // rside.rotation.z = -Math.PI/2;
  right_side.position.y = 1;
  scene.add(rside);
  rside.add(right_side)
  rside.position.x = 5;
  rside.position.y = -1;
}

function leftSide() {
  // left side
  let geometry = new THREE.BoxBufferGeometry(THICKNESS, HEIGHT, WIDTH);
  // let material = new THREE.MeshFaceMaterial(cubeMaterial);
  let left_side = new THREE.Mesh(geometry, leftSideMaterial);
  // rside.rotation.z = -Math.PI/2;
  left_side.position.y = 1;
  scene.add(lside);
  lside.add(left_side)
  lside.position.x = -5;
  lside.position.y = -1;
}

function frontSide() {
  // front side
  let geometry = new THREE.BoxBufferGeometry(LENGTH, HEIGHT, THICKNESS);
  // let material = new THREE.MeshFaceMaterial(cubeMaterial);
  let front_side = new THREE.Mesh(geometry, frontMaterial);
  // rside.rotation.z = -Math.PI/2;
  front_side.position.y = 1;
  scene.add(fside);
  fside.add(front_side)
  fside.position.z = 4;
  fside.position.y = -1;
}

function backSide() {
  // back side
  let geometry = new THREE.BoxBufferGeometry(LENGTH, HEIGHT, THICKNESS);
  // let material = new THREE.MeshFaceMaterial(cubeMaterial);
  let back_side = new THREE.Mesh(geometry, frontMaterial);
  // rside.rotation.z = -Math.PI/2;
  back_side.position.y = 1;
  scene.add(bside);
  bside.add(back_side)
  bside.position.z = -4;
  bside.position.y = -1;
}

function topSide() {
  // top side
  let geometry = new THREE.BoxBufferGeometry(LENGTH, THICKNESS, WIDTH);
  // let material = new THREE.MeshFaceMaterial(cubeMaterial);
  let top_side = new THREE.Mesh(geometry, topMaterial);
  // rside.rotation.z = -Math.PI/2;
  // top_side.position.z = 7;
  top_side.position.y = 0;
  top_side.position.x = -5;
  // top_side.position.z = 4;
  scene.add(tside);
  tside.add(top_side)
  // tside.position.x = 5;
  // tside.position.x = -5;
  tside.position.y = 1;
  // tside.position.z = -4;
  tside.position.x = 5;
  // tside.position.z = -5;
}


// Draw Scene
let render = () => {

  if (lside.rotation.z < Math.PI / 2 && box_status == false) {
    lside.rotation.z += ROTATION_ANGLE_IN_RADIAN;
    fside.rotation.x += ROTATION_ANGLE_IN_RADIAN;
    bside.rotation.x -= ROTATION_ANGLE_IN_RADIAN;
    tside.rotation.z -= 2 * ROTATION_ANGLE_IN_RADIAN;
    if (tside.rotation.z >= -Math.PI / 2) {
      console.log('****************OPEN******************', tside.rotation.z);
    } else {
      // rside.rotation.z -= 2 * ROTATION_ANGLE_IN_RADIAN;
      // tside.rotation.z -= 2 * ROTATION_ANGLE_IN_RADIAN;  
    }
    console.log('****************OPEN******************', box_status);
    if (lside.rotation.z > Math.PI / 2) {
      box_status = true
    }
  }

  if (lside.rotation.z > 0 && box_status == true) {
    // rside.rotation.z += ROTATION_ANGLE_IN_RADIAN;
    lside.rotation.z -= ROTATION_ANGLE_IN_RADIAN;
    fside.rotation.x -= ROTATION_ANGLE_IN_RADIAN;
    bside.rotation.x += ROTATION_ANGLE_IN_RADIAN;
    tside.rotation.z += 2 * ROTATION_ANGLE_IN_RADIAN;
    if (tside.rotation.z < 0) {
      console.log('*********************CLOSE****************', box_status);
    } else {
      // 
    }
    console.log('*********************CLOSE****************', box_status);
    if (lside.rotation.z < 0) {
      box_status = false
    }
  }
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