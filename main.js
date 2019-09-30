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
control = new THREE.OrbitControls(camera, renderer.domElement)

// creating the sphere
// let geometry = new THREE.SphereGeometry(5, 32, 32);
let geometry = new THREE.CubeGeometry(4, 4, 4);
let cubeMaterial = [
  // new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('./asset/fakes_death.jpg'), side: THREE.DoubleSide}), // right side
  new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }), // right side
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

/**
 * Wall Geometry
 */
// floor Geometry
// let floorGeometry = new THREE.CubeGeometry(20, 1, 20);
// let floorMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./asset/texture1.jpg'), side: THREE.DoubleSide});
// let floorCube = new THREE.Mesh(floorGeometry, floorMaterial);
// floorCube.position.y = -5;
// scene.add(floorCube);
// // ceiling Geometry
// let ceilingGeometry = new THREE.CubeGeometry(20, 1, 20);
// let ceilingMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./asset/texture2.jpg'), side: THREE.DoubleSide});
// let ceilingCube = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
// ceilingCube.position.y = 5;
// scene.add(ceilingCube);
// // left wall Geometry
// let leftWallGeometry = new THREE.CubeGeometry(1, 20, 20);
// let leftWallMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./asset/texture3.jpg'), side: THREE.DoubleSide});
// let leftWallCube = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
// leftWallCube.position.x = -5;
// scene.add(leftWallCube);
// // right wall Geometry
// let rightWallGeometry = new THREE.CubeGeometry(1, 20, 20);
// let rightWallMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./asset/texture4.jpg'), side: THREE.DoubleSide});
// let rightWallCube = new THREE.Mesh(floorGeometry, floorMaterial);
// rightWallCube.position.x = 5;
// scene.add(rightWallCube);


// game logic
let update = () => {
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.0005;
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