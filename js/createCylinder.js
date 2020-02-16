

var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
var whiteMat = new THREE.MeshLambertMaterial({color: new THREE.Color(1,1,1)}); 
var myFont;

function createScene() {
    var color = new THREE.Color(0, 1, 0);
    var mat = new THREE.MeshLambertMaterial({color: color, side: THREE.DoubleSide});    
    var geom = createCylinder(12, 6.0, 2.0);
    var mesh = new THREE.Mesh(geom, mat);
    var axes = new THREE.AxisHelper( 20 );  
    var light = new THREE.PointLight(0xFFFFFF, 1, 1000 );
    light.position.set(0, 0, 10);
    var light2 = new THREE.PointLight(0xFFFFFF, 1, 1000);
    light2.position.set(0, -10, -10);
    var ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(light, light2, ambientLight);
    scene.add(mesh, axes);
}

function createCylinder(n, len, rad){
    var inc = 2.0*Math.PI/n;
		
    var geom = new THREE.Geometry();
		
		
	geom.vertices.push( new THREE.Vector3(0, len/2.0, rad));
	geom.vertices.push( new THREE.Vector3(0, -len/2.0, rad));
	for(var i=2, a=inc ; i < 2*n ;i+=2, a+=inc){
	        var tpt = new THREE.Vector3(rad*Math.sin(a), len/2.0, rad*Math.cos(a));
		var bpt = new THREE.Vector3();
		bpt.y = -len/2.0;
		geom.vertices.push(tpt);
		geom.vertices.push(bpt);
			
		geom.faces.push( new THREE.Face3( i-2, i-1, i));
		geom.faces.push( new THREE.Face3( i-1, i+1, i));		
	}
		// close cylinder
		geom.faces.push( new THREE.Face3( 0,1,i-2));
		geom.faces.push( new THREE.Face3( 1,i-2,i-1));		

		if( isCappedTop )
			for (i = 0; i<n-2 ; i++)
				geom.faces.push( new THREE.Face3( 0, 2*i+2, 2*i+4));		
		if( isCappedBottom )
			for (i = 0; i<n-2 ; i++)
				geom.faces.push( new THREE.Face3( 2*i+5, 2*i+3, 1));		

		geom.computeFaceNormals();


		return geom;
}




function animate() {
	window.requestAnimationFrame(animate);
	render();
}


function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);
	renderer.render(scene, camera);
}


function init() {
	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({antialias : true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor(0x000000, 1.0);

	camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
	camera.position.set(0, 0, 16);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}


function addToDOM() {
	var container = document.getElementById('container');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}

function loadFontCreateScene() {
    var loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
        myFont = font;
        console.log(myFont)
        createScene();
    });
}

try {
	init();
    loadFontCreateScene();
	addToDOM();
    render();
	animate();
} catch(e) {
    var errorMsg = "Error: " + e;
    document.getElementById("msg").innerHTML = errorMsg;
}

