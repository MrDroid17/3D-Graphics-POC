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


// bottom
let bt_geometry = new THREE.BoxBufferGeometry(LENGTH, THICKNESS, WIDTH);
let bt_material = new THREE.MeshBasicMaterial({ color: 0x0ff0ff, side: THREE.DoubleSide });
let bottom = new THREE.Mesh(bt_geometry, bt_material);
bottom.position.set(0, -1.5, 0);
scene.add(bottom);
camera.position.z = 10;

// left side
let ls_geometry = new THREE.BoxBufferGeometry(THICKNESS, HEIGHT, WIDTH);
let ls_material = new THREE.MeshBasicMaterial({ color: 0x0fadff, side: THREE.DoubleSide });
let left_side = new THREE.Mesh(ls_geometry, ls_material);
left_side.position.set(-5, 0, 0);
scene.add(left_side);

// right side
let rs_geometry = new THREE.BoxBufferGeometry(THICKNESS, HEIGHT, WIDTH);
let rs_material = new THREE.MeshBasicMaterial({ color: 0x0bcdff, side: THREE.DoubleSide });
let right_side = new THREE.Mesh(rs_geometry, rs_material);
right_side.position.set(5, 0, 0);
scene.add(right_side);
// front side
let fs_geometry = new THREE.BoxBufferGeometry(LENGTH, HEIGHT, THICKNESS);
let fs_material = new THREE.MeshBasicMaterial({ color: 0xabcdff, side: THREE.DoubleSide });
let front_side = new THREE.Mesh(fs_geometry, fs_material);
front_side.position.set(0, 0, 4);
scene.add(front_side);
// back side
let bs_geometry = new THREE.BoxBufferGeometry(LENGTH, HEIGHT, THICKNESS);
let bs_material = new THREE.MeshBasicMaterial({ color: 0xcdefff, side: THREE.DoubleSide });
let back_side = new THREE.Mesh(bs_geometry, bs_material);
back_side.position.set(0, 0, -4);
scene.add(back_side);


// top
let ts_geometry = new THREE.BoxBufferGeometry(LENGTH, THICKNESS, WIDTH);
let ts_material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
let top_side = new THREE.Mesh(ts_geometry, ts_material);
top_side.position.set(0, 1.5, 0);
scene.add(top_side);
// let top_side = new THREE.Mesh(geometry2, material2);
// top_side.position.set(0, 1.5, 0);
// scene.add(top_side);
// base.rotation.x = Math.PI/2;
let x_axis, y_axis, z_axis;
const open_x_val = 0.7;
const open_y_val = 4;
const open_z_val = 0;
const open_rot_z_val = -Math.PI / 6;

const close_x_val = 0;
const close_y_val = 1.5;
const close_z_val = 0;
const close_rot_z_val = 0;
let rotZ = 0;
let rotY = close_y_val;
let rotX = close_x_val;

let intervalObj;
boxControl = () => {

  if (!box_status) {
    box_status = true;
    intervalObj = setInterval(() => {
      openBox();
    }, 50);
  } else {
    box_status = false;
    intervalObj = setInterval(() => {
      closeBox();
    }, 50);
  }
}


// game logic
// let update = () => {    
// if(box_status){
//   openBox()
// }

// };
openBox = () => {
  if (rotZ >= open_rot_z_val) {
 
    rotZ -= 0.01;
    rotY += 0.048;
    (rotZ >= open_rot_z_val / 2) ? rotX += 0.005 : rotX += 0.02;
    top_side.rotation.z = rotZ;
    top_side.position.set(rotX, rotY, 0)
    console.log('open', rotX, rotY, rotZ);
    front_side.rotation.x = - 2.5*rotZ;
    back_side.rotation.x =  2.5*rotZ;
    left_side.rotation.z =  - 2.5*rotZ;
  } else {
    clearInterval(intervalObj);
  }
}

closeBox = () => {
  if (rotZ <= 0) {
    rotZ += 0.01;
    rotY -= 0.048;
    (rotZ >= close_rot_z_val / 2) ? rotX -= 0.006 : rotX -= 0.013;
    top_side.rotation.z = rotZ;
    top_side.position.set(rotX, rotY, 0)
    console.log(rotX, rotY, rotZ);
  } else {
    clearInterval(intervalObj);
  }
}

selectView = side_index => {
  scene.add(cube);
  console.log('Side index ========>', side_index)
  console.log('Side index ========>', typeof (side_index));
  const box_sides = {
    RIGHT: 0,
    LEFT: 1,
    TOP: 2,
    BOTTOM: 3,
    FRONT: 4,
    BACK: 5
  }
  // cube.rotation.x = 0;
  // cube.rotation.y = 0;
  // cube.rotation.z = 0;

  switch (parseInt(side_index)) {
    case box_sides.RIGHT:
      console.log('match===>', side_index);
      cube.rotation.y = -Math.PI / 2;
      top_side.rotation.y = -Math.PI / 2;
      break;
    case box_sides.LEFT:
      console.log('match===>', side_index);
      cube.rotation.y = Math.PI / 2;
      top_side.rotation.y = Math.PI / 2;
      break;
    case box_sides.TOP:
      console.log('match===>', side_index);
      cube.rotation.x = Math.PI / 2;
      top_side.rotation.x = Math.PI / 2;
      break;
    case box_sides.BOTTOM:
      console.log('match===>', side_index);
      cube.rotation.x = -Math.PI / 2;
      top_side.rotation.x = -Math.PI / 2;
      break;
    case box_sides.FRONT:
      console.log('match===>', side_index);
      cube.rotation.x = 0;
      // cube.rotation.y = Math.PI;
      cube.rotation.y = 0;
      cube.rotation.z = 0;
      top_side.rotation.x = 0;
      top_side.rotation.y = 0;
      top_side.rotation.z = 0;
      break;
    case box_sides.BACK:
      console.log('match===>', side_index);
      cube.rotation.x = 0;
      cube.rotation.y = Math.PI;
      top_side.rotation.y = Math.PI;
      cube.rotation.z = 0;
      break;
    default:
      cube.rotation.x = 0;
      cube.rotation.y = 0;
      cube.rotation.z = 0;
      break;
      break;
      break;
  }

  console.log('finish');

}



// const n1 = new THREE.Vector3( 0, 1, 0 );
// const d1 = 2;
// const q1 = new THREE.Vector3( 0, 2, 0 );
// const plane1 = new THREE.Plane( n1, -d1 );
// console.log( plane1.distanceToPoint( q1 ) );  
// base.position = 10;




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