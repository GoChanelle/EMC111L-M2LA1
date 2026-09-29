// CREATE SCENE ----------------------------------------------------------------------------------------------------
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera();
scene.background = new THREE.Color(0x13141f)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

camera.position.z = 1;

// THE NOT DVD LOGO ------------------------------------------------------------------------------------------------
const geometry = new THREE.PlaneGeometry(0.3, 0.2);
const material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
const notDVD = new THREE.Mesh(geometry,material);

notDVD.position.set(0, 0, 0);
scene.add(notDVD);


// ANIMATE  -------------------------------------------------------------------------------------------------------
// Constants
let xSpeed = 0.005;
let ySpeed = 0.005;

const geoWidth = 0.3;
const geoHeight = 0.2;

const boundX = camera.right - (geoWidth / 2);
const boundY = camera.top - (geoHeight / 2);

let bounces = 0;

// Change color
function randomColor() {
    notDVD.material.color.setRGB(Math.random(256), Math.random(256), Math.random(256));
}

// Change size
function decreaseSize() {
    notDVD.scale.x -= 0.15;
    notDVD.scale.y -= 0.15;
}

// Check bounces
function checkBounce() {
    bounces++;
    console.log("DVD Bounces: " + bounces);
}

// Stop bounces
function stopMovement() {
    xSpeed = 0;
    ySpeed = 0;
    notDVD.visible = false;
}

function animate() {
    renderer.render(scene, camera);

    notDVD.position.x += xSpeed;
    notDVD.position.y += ySpeed;

    if (notDVD.position.x > boundX) {
        xSpeed = -xSpeed;
        decreaseSize();
        randomColor();
        checkBounce();

    } else if (notDVD.position.x < -boundX) {
        xSpeed = 0.005;
        decreaseSize();
        randomColor();
        checkBounce();

    } else if (notDVD.position.y > boundY) {
        ySpeed = -0.005;
        decreaseSize();
        randomColor();
        checkBounce();

    } else if (notDVD.position.y < -boundY) {
        ySpeed = 0.005;
        decreaseSize();
        randomColor();
        checkBounce();

    } else if (bounces >= 8) {
        stopMovement();
    }
}

renderer.setAnimationLoop(animate);
