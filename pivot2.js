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
const HEIGHT = 2;
const WIDTH = 8;
const THICKNESS = 0.05;

// bottom
let bt_geometry = new THREE.BoxBufferGeometry(LENGTH, THICKNESS, WIDTH);
let bt_material = new THREE.MeshBasicMaterial({ color: 0x0ff0ff, side: THREE.DoubleSide });
let bottom = new THREE.Mesh(bt_geometry, bt_material);
bottom.position.set(0, -1, 0);
scene.add(bottom);
camera.position.z = 10;

// right side
let rs_geometry = new THREE.BoxBufferGeometry(THICKNESS, HEIGHT, WIDTH);
let rs_material = new THREE.MeshBasicMaterial({ color: 0x0bcdff, side: THREE.DoubleSide });
let right_side = new THREE.Mesh(rs_geometry, rs_material);
var rside = new THREE.Object3D();
// rside.rotation.z = -Math.PI/2;
right_side.position.y = 1;
scene.add(rside);
rside.add(right_side)
rside.position.x = 5;
rside.position.y = -1;

// Draw Scene
let render = () => {

  if (rside.rotation.z >= -Math.PI / 2 && box_status==false) {
    rside.rotation.z -= 0.02;
    console.log('****************OPEN******************', rside.rotation.z, box_status);
    if(rside.rotation.z<-Math.PI / 2) {
      box_status = true
    }
  }

 if (rside.rotation.z <= 0 && box_status==true) {
    rside.rotation.z += 0.02;
    console.log('*********************CLOSE****************',rside.rotation.z, box_status);
    if(rside.rotation.z> 0) {
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