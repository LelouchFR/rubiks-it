import './style.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import CubeTexture from './textures/test.png';

let colors: number[] = [0x5438dc, 0xBA3B46, 0x99D17B, 0xF4B860, 0x93C0A4, 0xFFCAD4];

const scene: THREE.Scene = new THREE.Scene();

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
	canvas: document.querySelector("#bg") as HTMLCanvasElement
});

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let texture: THREE.Texture = new THREE.TextureLoader().load(CubeTexture);

// @ts-ignore
const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);

let cubeSize: number = 1;
let cubeSpacing: number = 0;
let cubeCount: number = 3;

// Create the cubes
let cubes: any[] = [];
for (let i: number = 0; i < cubeCount; i++) {
	for (let j: number = 0; j < cubeCount; j++) {
		for (let k: number = 0; k < cubeCount; k++) {
      		let xPos: number = (i - 1.5) * (cubeSize + cubeSpacing);
      		let yPos: number = (j - 1.5) * (cubeSize + cubeSpacing);
      		let zPos: number = (k - 1.5) * (cubeSize + cubeSpacing);

		    let cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

      		let cubeMaterials: THREE.MeshBasicMaterial[] = [
        		new THREE.MeshBasicMaterial({color: colors[0], map: texture}),
        		new THREE.MeshBasicMaterial({color: colors[1], map: texture}),
        		new THREE.MeshBasicMaterial({color: colors[2], map: texture}),
        		new THREE.MeshBasicMaterial({color: colors[3], map: texture}),
        		new THREE.MeshBasicMaterial({color: colors[4], map: texture}),
        		new THREE.MeshBasicMaterial({color: colors[5], map: texture})
      		];
      
	  		let cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]> = new THREE.Mesh(cubeGeometry, cubeMaterials);

      		cube.position.set(xPos, yPos, zPos);
      		scene.add(cube);
      		cubes.push(cube);
    	}
  	}
}

camera.position.z = 5;

function animate(): void {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	const helper = new THREE.CameraHelper(camera);
	scene.add(helper);
	const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);
}


animate();