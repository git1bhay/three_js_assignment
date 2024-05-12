import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { FBXLoader } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const cloudTexture = [
    "./bluecloud_ft.png",
    "./bluecloud_bk.png",
    "./bluecloud_up.png",
    "./bluecloud_dn.png",
    "./bluecloud_rt.png",
    "./bluecloud_lf.png",
  ];
const skyBox = new THREE.CubeTextureLoader().load(cloudTexture);
scene.background = skyBox;

// Add a cube to the scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 2;

scene.add(cube);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(3,32,32),new THREE.MeshStandardMaterial({color:'green'}));
scene.add(sphere);
sphere.position.set(4,4,0);


const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);

// const AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);


scene.add(directionalLight);

// Add mouse controls

const controls = new OrbitControls(camera, renderer.domElement);

const transformControls = new TransformControls(camera, renderer.domElement);

scene.add(transformControls);

const loader = new FBXLoader();
loader.load('model (1).fbx',(fbx)=>{
    // console.log(fbx);4
    const model = fbx;
    model.scale.set(0.01,0.01,0.01);
    model.position.x = 2;
    model.rotation.x = -Math.PI / 2;
    
    scene.add(model);
    transformControls.attach(model);

})
const SpotLight = new THREE.SpotLight(0xFFBF00,100);
scene.add(SpotLight);
SpotLight.position.set(-68.46,3.09,0);
const light2 = SpotLight.clone();
const light3 = SpotLight.clone();
light3.position.set(-18.28,4.815,-1.4);

light2.position.set(-68.46,3.09,-20);
scene.add(light2,light3);


// transformControls.attach(SpotLight);

transformControls.addEventListener("dragging-changed", (e) => {
    // console.log(orbitControls.enabled);

    controls.enabled = !e.value;
    // controls1.enabled = !e.value;
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "1") {
      transformControls.setMode("translate");
    } else if (event.key === "2") {
      transformControls.setMode("rotate");
    } else if (event.key === "3") {
      transformControls.setMode("scale");
    }
  });
// Add a ground plane
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('grass.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(2, 2);
const groundGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
const groundMaterial = new THREE.MeshBasicMaterial({color:0x98f797, map:texture});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Position the camera
camera.position.z = 10;
camera.position.y = 2;


// Render loop
function animate() {
    requestAnimationFrame(animate);
    // console.log(SpotLight.position);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    controls.update();
}
animate();
