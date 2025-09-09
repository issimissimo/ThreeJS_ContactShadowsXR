import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
import ContactShadowsXR from "./contactShadowsXR";
import "./style.css";

let container;
let camera, scene, renderer, shadows, cube


// check for webxr session support
if ("xr" in navigator) {
  navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
    if (supported) {
      document.getElementById("ar-not-supported").style.display = "none";
      init();
    }
  });
}


function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20
  );
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);
  renderer.xr.addEventListener("sessionstart", sessionStart);

  document.body.appendChild(
    ARButton.createButton(renderer, {
      requiredFeatures: ["local", "hit-test", "dom-overlay"],
      domOverlay: { root: document.querySelector("#overlay") },
    })
  );

  window.addEventListener("resize", onWindowResize);
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


function sessionStart() {

  //show #tracking-prompt
  document.getElementById("tracking-prompt").style.display = "block";


  const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(0, -0.5, -1);
  scene.add(cube);


  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0, 2, 0);
  scene.add(light);





  shadows = new ContactShadowsXR(scene, renderer, {
    position: new THREE.Vector3(0, -1, -1),
    resolution: 512,
    blur: 2,
    animate: true,
  });



  renderer.setAnimationLoop(loop);
}




function loop(timestamp, frame) {

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  shadows.update();
  renderer.render(scene, camera)
}