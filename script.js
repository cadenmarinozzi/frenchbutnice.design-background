/* 
    It is necessary to use three version 0.111.0 (I think) for this to work.
    I have tested it on a few other versions but it doesn't always work as expected.

    You cannot go above three version 0.111.0 as 0.112.0 and above have gamma correction removed.
    Although I'm not sure about lower than 0.111.0 as I haven't tested it.
*/

import * as THREE from "three";
import { GLTFLoader } from "https://unpkg.com/three@0.111.0/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "https://unpkg.com/three@0.111.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://unpkg.com/three@0.111.0/examples/jsm/postprocessing/RenderPass.js";

const canvas = document.querySelector("canvas");

// Interpolate between two values a and b by an amount t
function lerp(a, b, t) {
	return (1 - t) * a + t * b;
}

let parallax = {
	x: 0,
	y: 0,
};

let lerpedParallax = {
	x: 0,
	y: 0,
};

let width = window.innerWidth;
let height = window.innerHeight;

let scene = new THREE.Scene();

let renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true, // This isn't set on frenchbutnice's code, but it's a good idea to have it on.
});

let camera, composer;

// Load the file containing the scene objects/camera/lighting
new GLTFLoader().load(
	"https://gist.githubusercontent.com/nekumelon/fea5cbbf59bb77cd484b2a2bef4547a0/raw/41dae8e9df77e61b11edd18dc9f8b6a9649bbb12/model.gltf",
	onGLTFLoaded
);

// Event listeners
window.addEventListener("mousemove", (event) => {
	parallax.x = (event.clientX / width) * 2 - 1;
	parallax.y = (event.clientY / height) * 2 - 1;
});

window.addEventListener("resize", resize);

function onGLTFLoaded(gltf) {
	// This is VERY important as it is what makes the scene on frencbutnice look so vibrant
	renderer.gammaOutput = true;
	renderer.gammaFactor = 2.2;

	camera = gltf.cameras[0];

	composer = new EffectComposer(renderer);
	composer.setSize(window.innerWidth, window.innerHeight);
	composer.addPass(new RenderPass(scene, camera));

	// If you want to edit the scene objects you can look through gltf.scenes
	scene.add(gltf.scenes[0]);

	// Everything is ready and loaded
	resize();
	animate();
}

function resize() {
	width = window.innerWidth;
	height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	renderer.setSize(width, height);
}

function animate() {
	lerpedParallax.x = lerp(lerpedParallax.x, parallax.x, 0.12);

	camera.rotation.y = -0.151193070363247 - 0.075 * lerpedParallax.x;

	composer.render();

	requestAnimationFrame(animate);
}
