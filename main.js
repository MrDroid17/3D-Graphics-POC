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

// creating the sphere
// let geometry = new THREE.SphereGeometry(5, 32, 32);
let geometry = new THREE.BoxBufferGeometry(LENGTH, HEIGHT, WIDTH);
let cubeMaterial = [
  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./asset/fakes_death.jpg'), side: THREE.DoubleSide }), // right side
  // new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }), // right side
  new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('./asset/rachal_mcadams.jpg'), side: THREE.DoubleSide }), // left side
  new THREE.MeshLambertMaterial({ transparent: true, color: 0xff0000, side: THREE.BackSide }), // top side
  // new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./asset/samurai_jack.jpg'), side: THREE.DoubleSide }), // top side
  new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./asset/shrek.jpg'), side: THREE.DoubleSide }), // bottom side
  new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./asset/used_to_be_cool.jpg'), side: THREE.DoubleSide }), // front side
  new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./asset/what_is_this.jpg'), side: THREE.DoubleSide }), // back side
];

let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
let pointLight = new THREE.PointLight(0xffffff, 0.5);
scene.add(pointLight);

// Create a material, image or color texture
// let material = new THREE.MeshLambertMaterial({color: 0xabcdef, wireframe: true});
let material = new THREE.MeshFaceMaterial(cubeMaterial);
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 10;

let geometry2 = new THREE.BoxBufferGeometry(10, 0.05, 8);
let material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
let cover = new THREE.Mesh(geometry2, material2);
cover.position.set(0, 1.5, 0);
scene.add(cover);
// base.rotation.x = Math.PI/2;

openBox = () => {
  console.log('called')
  if (!box_status) {
    cover.position.set(0.7, 4, 0)
    cover.rotation.z = -Math.PI / 6;
    box_status = true;
  } else {
    cover.position.set(0, 1.5, 0);
    cover.rotation.z = 0;
    box_status = false;
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
      cover.rotation.y = -Math.PI / 2;
      break;
    case box_sides.LEFT:
      console.log('match===>', side_index);
      cube.rotation.y = Math.PI / 2;
      cover.rotation.y = Math.PI / 2;
      break;
    case box_sides.TOP:
      console.log('match===>', side_index);
      cube.rotation.x = Math.PI / 2;
      cover.rotation.x = Math.PI / 2;
      break;
    case box_sides.BOTTOM:
      console.log('match===>', side_index);
      cube.rotation.x = -Math.PI / 2;
      cover.rotation.x = -Math.PI / 2;
      break;
    case box_sides.FRONT:
      console.log('match===>', side_index);
      cube.rotation.x = 0;
      // cube.rotation.y = Math.PI;
      cube.rotation.y = 0;
      cube.rotation.z = 0;
      cover.rotation.x = 0;
      cover.rotation.y = 0;
      cover.rotation.z = 0;
      break;
    case box_sides.BACK:
      console.log('match===>', side_index);
      cube.rotation.x = 0;
      cube.rotation.y = Math.PI;
      cover.rotation.y = Math.PI;
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


// game logic
let update = () => {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.005;
  // if(y< Math.PI/2){
  //   cube.rotation.y += .05;
  // }

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