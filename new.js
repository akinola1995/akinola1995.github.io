/ **
 * Copyright (c) 2019
 * 
 * /

// Size of the cubes for the game
var UNITWIDTH = 90,
    UNITHEIGHT = 45,
    backgroundColor = 0xe0e0e0,
    groundColor = 0xc21c23,
    viewAngle = 40,
    near = 1,
    far = 2000,
    PLAYERSPEED = 200, // How fast the player moves
    directionBlock = 0,
    collidableObjects = [],
    PLAYERCOLLISIONDISTANCE = 20,
    Field_Width = 500,
    Field_Length = 1000,
    score1 = 0,
    score2 = 0,
    cube1,
    cube2;

// Flags to determine which direction the player is moving
var moveLeft = false;
var moveRight = false;

scoreBoard = document.getElementById ('scoreBoard');


var camera, scene, renderer, background, right, left, player1, player2, cube, clock, delta, controls;
var blockSpeed  = new THREE.Vector3 (0,0,0);

// Game setup
init ();
animate();


function init () {
  clock = new THREE.Clock ();
  // Create the scene
  scene = new THREE.Scene ();

  // Set render
  renderer = new THREE.WebGLRenderer ();
  renderer.setClearColor (backgroundColor);
  renderer.setPixelRatio (window.devicePixelRatio);
  renderer.setSize (window.innerWidth, window.innerHeight);

  // Render to the container
  var container = document.getElementById ('container');
  container.appendChild (renderer.domElement);

  // Define the position of the camera
  camera = new THREE.PerspectiveCamera (40, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 800;
  camera.position.y = 100;

  // point camera on scene
  camera.lookAt (blockSpeed);

  scene.add (camera);

  controls = new THREE.PointerLockControls (camera);
  scene.add (controls.getObject());

  // Add the walls (cubes) of the maze
  createBackground();
  rearwall();
  createWalls();
  sliders();
  Cube();
  updateScoreBoard();
 
  listenPressedKeys();

  // Add lights to the scene
  lights();
  Block();
  Block2();

  // Listen for if the window changes sizes and adjust
  window.addEventListener ('resize', onWindowResize, false);

}

// computer movement (player)
function computer_player() {
if (player1.position.x - 100> cube.position.x) {
   player1.position.x - = Math.min (player1.position.x - cubo.position.x, 4);
 } else if (player1.position.x - 100 <cube.position.x) {
   player1.position.x + = Math.min (cube.position.x - player1.position.x, 4);
 }
 if (player1.position.x == player1.position.x) {
  player1.position.x + = 5;
 }
}

// Add lights to the scene
function lights() {
  var light = new THREE.DirectionalLight (0xffffff, 1.2);
  light.position.set (1, 2, 1);
  scene.add(light);

}

// Create the game background
function createBackground() {
    var backgroundGeometry = new THREE.BoxGeometry (Width_field, 1, Length_field),
        backgroundMaterial = new THREE.MeshPhongMaterial ({color: groundColor}),
        background = new THREE.Mesh (backgroundGeometry, backgroundMaterial);
    background.position.set (0,0,0);
    scene.add(background);
}





function backwall() {
    var backgroundGeometry = new THREE.BoxGeometry (Width_field + 40, 250, 1),
        backgroundMaterial = new THREE.MeshPhongMaterial ({color: groundColor}),
        background = new THREE.Mesh (backgroundGeometry, backgroundMaterial);
    background.position.set(-5,140, ​​-Length_field / 2);
    scene.add(background);
   
}

function createWalls () {
    var backgroundGeometry = new THREE.BoxGeometry (20, 20, Length_field),
        backgroundMaterial = new THREE.MeshPhongMaterial ({color: groundColor}),
        left = new THREE.Mesh (backgroundGeometry, backgroundMaterial),
        right = new THREE.Mesh (backgroundGeometry, backgroundMaterial);
    left.position.set(-Width_field / 2-10,10,0);
    right.position.set(Field_ Width / 2 + 10,10,0);
    scene.add(right);
    scene.add(left);
}

function sliders() {
    var playersGeometry = new THREE.BoxGeometry (100, 20, 10),
    playersMaterial = new THREE.MeshPhongMaterial ({color: 0x15ea9c});
    player1 = new THREE.Mesh (playersGeometry, playersMaterial);
    player2 = new THREE.Mesh (playersGeometry, new THREE.MeshPhongMaterial ({color: 0xeaa615}));
    player1.position.set(0.10, -Length_field / 2 + 20);
    player2.position.set(0.10, Length_field / 2 - 20);
    scene.add(player1);
    scene.add(player2);
    collidableObjects.push(player1);
    collidableObjects.push(player2);
}

function Cube() {
  var cubeGeometry = new THREE.BoxGeometry (10,10,10),
      cubeMaterial = new THREE.MeshPhongMaterial ({color: backgroundColor});
  cube = new THREE.Mesh (cubeGeometry, cubeMaterial);
  cube.position.set (0,5,0);
  scene.add (cube);
  collidableObjects.push(cube);
}



function Block() {

  var cubeGeometry = new THREE.BoxGeometry (30, 30, 30);
  var cubeMaterial = new THREE.MeshPhongMaterial ({color: groundColor});
  var cu = new THREE.Mesh (cubeGeometry, cubeMaterial);
  cu.position.set (RandomXCube(), 10, RandomYCube());
  cube1 = cu;
  scene.add(cube1);
 
}


function Block2() {

  var cubeGeometry = new THREE.BoxGeometry (30, 30, 30);
  var cubeMaterial = new THREE.MeshPhongMaterial ({color: groundColor});
  var cu = new THREE.Mesh (cubeGeometry, cubeMaterial);
  cu.position.set (RandomXCube(), 10, RandomYCube());
  cube2 = cu;
  scene.add (cube2);
 
}

function RandomXCube() {
  return Math.random() * ((Field_Width /2-50) - (-Field_Width /2 + 50)) + (-Field_Width /2 + 50);
}

function RandomYCube () {
  return Math.random () * ((Length_field /2-200) - (-Length_field /2 + 200)) + (-Length_field /2 + 200);
  
}


function listenPressedKeys() {
  // Key pressed

  varPressedKeys = function(event) {
    switch (event.which) {
      case 37: Left();
        break;
      case 39: Right();
        break;
      case 32:
        reset()
        break;
    }
  };

  // Back key
  var Backkey = function (event) {
  switch (event.which) {
    case 37:
    player2.position.x - = 20;
      break;
   case 39:
   player2.position.x + = 20;
      break;
  }
};

// Add event listeners for when movement keys are pressed and released
document.addEventListener ('keydown', backkey, false);
document.addEventListener ('keyup', Pressedkey, false);
}

function Right() {
    player2.position.x + = 10;
}
function Left() {
    player2.position.x - = 10;
}

function controlCube() {

  
  if(! cube. $ velocity) {
    startCubeMovement();
  }
  updateCubePosition();
  if(cube.position.z == player2.position.z && (cube.position.x <player2.position.x + 50 && cube.position.x> player2.position.x - 50)) {
    cube. $velocity.x = (cube.position.x - player2.position.x) /3;
    cube. $velocity.z * = -1;
  }
  if(cube.position.z == player1.position.z && (cube.position.x <player1.position.x + 50 && cube.position.x> player1.position.x - 50)) {
    cube. $velocity.x = (cube.position.x - player1.position.x) /3;
    cube. $velocity.z * = -1;
  }
  
  if(cube.position.z> player2.position.z + 1000) {
    score1 = score1 + 1;
    updateScoreBoard();
    reset();
  }
  if(cube.position.z <player1.position.z -1000) {
    score2 = score2 + 1;
    updateScoreBoard();
    reset();
  }

 

  if (isSideCollision()) {
    cube. $velocity.x * = -1; console.log ("reset");

  }


 if (cube.position.x <cube1.position.x + 15 && cubo.position.x> cube1.position.x-15 && cubo.position.z <cube1.position.z + 15 && cubo.position.z> cube1.position.z-15) {
    cube. $velocity.x * = -1;
    cube. $velocity.z * = -1;

  }

 if (cubo.position.x <cube2.position.x + 15 && cubo.position.x> cube2.position.x-15 && cubo.position.z <cube2.position.z + 15 && cubo.position.z> cube2.position.z-15) {
  cube. $velocity.x * = -1;
  cube. $velocity.z * = -1;

}
}


// Adjusting the screen size
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix ();
  renderer.setSize (window.innerWidth, window.innerHeight);
}

// Animate the game
function animate () {
  render ();
  // Keep updating the renderer
  requestAnimationFrame (animate);
  controlCube ();
  computer_player ();

}

// Stop cube
function stopCube () {
  cube. $stoped = true;
}

// Game Reset
function reset () {
  console.log("reset");
  cube.position.set(0,10,0);
  cube. $velocity = null;
  player1.position.x = 0;
  player2.position.x = 0;
}

// Start cube movement
function getMotionCube () {
  direction var = Math.random ()> 0.5? -1: 1;
  cube. $ velocity = {
    x: 0,
    z: direction * 20
  };
}

// Update the cube position
function updateCubePosition() {
  var cubePos = cube.position;
  cubePos.x + = cube. $velocity.x;
  cubePos.z + = cube. $velocity.z;

}



// Render the scene
function render () {
  // requestAnimationFrame (render);
  
  renderer.render (scene, camera);
}

// Converts degrees to radians
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Converts radians to degrees
function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}


function isSideCollision() {
  var cubeX = cube.position.x,
      half = Field_Width / 2;
  return cubeX - 5 <-half || cubeX + 5> half;
}


  
function updateScoreBoard() {
  scoreBoard.innerHTML = 'PC-' + score1 + 'vs' + score2 + '-Player';
}
