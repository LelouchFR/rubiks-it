import './style.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import CubeTexture from './textures/test.png';

let colors: number[] = [0xFF521B, 0xC3423F, 0xF5E6E8, 0xFDE74C, 0x5BC0EB, 0x9BC53D];

const scene: THREE.Scene = new THREE.Scene();

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
	canvas: document.querySelector("#bg") as HTMLCanvasElement
});

renderer.setClearColor( 0xECD444, 1 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let texture: THREE.Texture = new THREE.TextureLoader().load(CubeTexture);

// @ts-ignore
const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);

let cubeSize: number = 1;
let cubeCount: number = 3;

// Create the cubes
let cubes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]>[] = [];
for (let i: number = 0; i < cubeCount; i++) {
	for (let j: number = 0; j < cubeCount; j++) {
		for (let k: number = 0; k < cubeCount; k++) {
      		let [xPos, yPos, zPos]: number[] = [cubeSize * (i - 1), cubeSize * (j - 1), cubeSize * (k - 1)];

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

type BasicBoxMesh = THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]>[];

interface CubeArgs {
	type: BasicBoxMesh;
	turn: number;
}

let angle: number = Math.PI / 2;

let leftCubesX: BasicBoxMesh, leftCubesY: BasicBoxMesh, leftCubesZ: BasicBoxMesh;
let middleCubesX: BasicBoxMesh, middleCubesY: BasicBoxMesh, middleCubesZ: BasicBoxMesh;
let rightCubesX: BasicBoxMesh, rightCubesY: BasicBoxMesh, rightCubesZ: BasicBoxMesh;

RefreshCubes();

function RefreshCubes(): void {
	leftCubesX = cubes.filter(cube => cube.position.x < 0);
	middleCubesX = cubes.filter(cube => cube.position.x === 0);
	rightCubesX = cubes.filter(cube => cube.position.x > 0);

	leftCubesY = cubes.filter(cube => cube.position.y < 0);
	middleCubesY = cubes.filter(cube => cube.position.y === 0);
	rightCubesY = cubes.filter(cube => cube.position.y > 0);

	leftCubesZ = cubes.filter(cube => cube.position.z < 0);
	middleCubesZ = cubes.filter(cube => cube.position.z === 0);
	rightCubesZ = cubes.filter(cube => cube.position.z > 0);
}

function CubeRotator(Args: CubeArgs): void {
	const {type, turn} = Args;
	const [Vec1, Vec2, Vec3] = [new THREE.Vector3(turn, 0, 0), new THREE.Vector3(0, turn, 0), new THREE.Vector3(0, 0, turn)];

	switch (type) {
		case leftCubesX:
			leftCubesX.forEach(cube => cube.rotateOnAxis(Vec1, angle));
			break;
		case middleCubesX:
			middleCubesX.forEach(cube => cube.rotateOnAxis(Vec1, angle));
			break;
		case rightCubesX:
			rightCubesX.forEach(cube => cube.rotateOnAxis(Vec1, angle));
			break;
		case leftCubesY:
			leftCubesY.forEach(cube => cube.rotateOnAxis(Vec2, angle));
			break;
		case middleCubesY:
			middleCubesY.forEach(cube => cube.rotateOnAxis(Vec2, angle));
			break;
		case rightCubesY:
			rightCubesY.forEach(cube => cube.rotateOnAxis(Vec2, angle));
			break;
		case leftCubesZ:
			leftCubesZ.forEach(cube => cube.rotateOnAxis(Vec3, angle));
			break;
		case middleCubesZ:
			middleCubesZ.forEach(cube => cube.rotateOnAxis(Vec3, angle));
			break;
		case rightCubesZ:
			rightCubesZ.forEach(cube => cube.rotateOnAxis(Vec3, angle));
			break;
		default:
			break;
	}
	
	RefreshCubes();
}

(document.querySelector('#L1') as HTMLElement).onclick = () => CubeRotator({ type: leftCubesX, turn: -1 });
(document.querySelector('#L2') as HTMLElement).onclick = () => CubeRotator({ type: leftCubesX, turn: 1 });
(document.querySelector('#L3') as HTMLElement).onclick = () => CubeRotator({ type: leftCubesY, turn: 1 });
(document.querySelector('#L4') as HTMLElement).onclick = () => CubeRotator({ type: leftCubesY, turn: -1 });
(document.querySelector('#M1') as HTMLElement).onclick = () => CubeRotator({ type: middleCubesX, turn: -1 });
(document.querySelector('#M2') as HTMLElement).onclick = () => CubeRotator({ type: middleCubesX, turn: 1 });
(document.querySelector('#M3') as HTMLElement).onclick = () => CubeRotator({ type: middleCubesY, turn: 1 });
(document.querySelector('#M4') as HTMLElement).onclick = () => CubeRotator({ type: middleCubesY, turn: -1 });
(document.querySelector('#R1') as HTMLElement).onclick = () => CubeRotator({ type: rightCubesX, turn: -1 });
(document.querySelector('#R2') as HTMLElement).onclick = () => CubeRotator({ type: rightCubesX, turn: 1 });
(document.querySelector('#R3') as HTMLElement).onclick = () => CubeRotator({ type: rightCubesY, turn: 1 });
(document.querySelector('#R4') as HTMLElement).onclick = () => CubeRotator({ type: rightCubesY, turn: -1 });

function animate(): void {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	RefreshCubes();
	const helper: THREE.CameraHelper = new THREE.CameraHelper(camera);
	const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper, helper);
}

animate();