import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const torusgeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusmaterial = new THREE.MeshStandardMaterial({color: 0xFF5733, wireframe: false});

const torus = new THREE.Mesh(torusgeometry, torusmaterial);

scene.add(torus)

//const ambientLight = new THREE.AmbientLight(0xffffff);
//scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);


const lightHelper =new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);


const gridHelper =new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
function addStar() {
        const geometry = new THREE.SphereGeometry(0.25, 24, 24)
        const material = new THREE.MeshStandardMaterial({color: 0xffffff})

        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

        star.position.set(x, y, z)
        scene.add(star)
}

Array(200).fill().forEach(addStar);

const backgroundTexture = new THREE.TextureLoader().load('birthday.jpg')
scene.background = backgroundTexture;
const sushiTexture = new THREE.TextureLoader().load('sushi.jpeg')
const sushi = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshBasicMaterial({map: sushiTexture})

)
scene.add(sushi)

function moveCamera()  {
        const t = document.body.getBoundingClientRect().top;

        sushi.rotation.x += 0.05;
        sushi.rotation.y += 0.075;
        sushi.rotation.z += 0.05;

        
        torus.rotation.x += 0.01;
        torus.rotation.x += 0.01;

        camera.position.z = t * -0.01;
        camera.position.x = t * -0.0002;
        camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera;
moveCamera();





renderer.render(scene, camera);

function animate() {
        requestAnimationFrame(animate);

        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        torus.rotation.z += 0.01;
        controls.update();
        renderer.render(scene, camera);
}

animate();


