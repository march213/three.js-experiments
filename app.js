import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.z = 1;
camera.position.x = 1;
camera.position.y = 1;
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.02, 32, 32), new THREE.MeshNormalMaterial());

function addPoint(x, y, z) {
  const point = mesh.clone();
  point.position.set(x, y, z);
  scene.add(point);

  return point;
}

// addPoint(0, 0, 0);

const numberOfPoints = 50;
const objects = [];

for (let i = 0; i < numberOfPoints; i++) {
  // theta could be called an angle or rotationAngle
  let theta = (i / numberOfPoints) * Math.PI * 2;
  let x = Math.cos(theta);
  let y = Math.sin(theta);
  let z = 0;

  let mesh = addPoint(x, y, z);

  objects.push({
    mesh,
    theta,
    random: Math.random(),
  });
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const size = 3;
const divisions = 40;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

function animate(time) {
  objects.forEach((obj, i) => {
    let { mesh, theta, random } = obj;

    let x = Math.cos(theta - time / 10000);
    let y = Math.sin(theta - time / 10000);
    let z = 0;

    mesh.position.set(x, y, z);
  });

  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  controls.update();

  renderer.render(scene, camera);
}
