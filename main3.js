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

// right side
let rsside = new THREE.Object3D();
generateRightSide(THICKNESS, HEIGHT, WIDTH, rsside);
// rsside.rotation.z = - Math.PI / 4;
// rsside.position.y = -1.5;
scene.add(rsside);
// rsside.position.y = 1.5;
let tsside = new THREE.Object3D();
generateTopSide(LENGTH, THICKNESS, WIDTH, rsside);
// rsside.rotation.z = - Math.PI / 4;
// rsside.position.y = -1.5;
scene.add(tsside);
// rsside.position.y = 1.5;

// bottom
let bt_geometry = new THREE.BoxBufferGeometry(LENGTH, THICKNESS, WIDTH);
let bt_material = new THREE.MeshBasicMaterial({ color: 0x0ff0ff, side: THREE.DoubleSide });
let bottom = new THREE.Mesh(bt_geometry, bt_material);
bottom.position.set(0, -1.5, 0);
scene.add(bottom);

function generateRightSide(th, ht, wt, rside){
  let rs_geometry = new THREE.BoxBufferGeometry(th, ht, wt);
  let rs_material = new THREE.MeshBasicMaterial({ color: 0x0bcdff, side: THREE.DoubleSide });
  let right_side = new THREE.Mesh(rs_geometry, rs_material);
  right_side.position.set(5, 0, 0);
  right_side.position.set(5, -1.5, 0);
  // right_side.rotation.z = - Math.PI / 4;
  // right_side.position.set(5, 1.5, 0);
  rside.add(right_side);
  // return right_side;
}

// top
function generateTopSide(lt, th, wt, tside){
let ts_geometry = new THREE.BoxBufferGeometry(lt, th, wt);
let ts_material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
let top_side = new THREE.Mesh(ts_geometry, ts_material);
top_side.position.set(0, 1.5, 0);
tside.add(top_side);
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
GameLoop()
// </script>