var prevPosX = 0;
var prevPosY = 0;
var scene = new THREE.Scene();
width = document.getElementById("sect").offsetWidth;
height = document.getElementById("sect").offsetHeight;
var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
var flag = false;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

camera.position.z = 10;
var targetRotationX = 0.5;
var targetRotationOnMouseDownX = 0;

var targetRotationY = 0.2;
var targetRotationOnMouseDownY = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;

var windowHalfX = width / 2;
var windowHalfY = height / 2;
var mousePosition = new THREE.Vector3(0, 0, 0.5);

var slowingFactor = 0.1;
var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    overdraw: 0.5,
});
var INTERSECTED;
renderer.setClearColor(0x000000, 0);

renderer.setSize(width, height);
document
    .getElementById("sect")
    .addEventListener("mousemove", onMouseMove, false);

document.getElementById("sect").appendChild(renderer.domElement);
document
    .getElementById("sect")
    .addEventListener("mousedown", onDocumentMouseDown, false);
var globe = new THREE.Mesh(
    new THREE.SphereGeometry(4, 32, 16),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./images/globe.png"),
    })
);
// let sprite = new THREE.TextSprite({
//   text: "Hello World!",
//   fontFamily: "Arial, Helvetica, sans-serif",
//   fontSize: 12,
//   color: "#ffbbff",
// });
// globe.add(sprite);
function onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
}
camera.position.set(0, 0, 10);

var deg = 0;
const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
});
// const points = [];
// points.push(new THREE.Vector3(0, 0, 0));
// points.push(new THREE.Vector3(4.5, 2, 2));
// const points2 = [];
// points2.push(new THREE.Vector3(0, 0, 0));
// points2.push(new THREE.Vector3(-4, 2.5, 2.5));
// const points3 = [];
// points3.push(new THREE.Vector3(0, 0, 0));
// points3.push(new THREE.Vector3(-4, 0, -4));
// const points4 = [];
// points4.push(new THREE.Vector3(0, 0, 0));
// points4.push(new THREE.Vector3(-4, -2, 4));
// const geometry = new THREE.BufferGeometry().setFromPoints(points);
// const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
// const geometry3 = new THREE.BufferGeometry().setFromPoints(points3);
// const geometry4 = new THREE.BufferGeometry().setFromPoints(points4);

// const line = new THREE.Line(geometry, material);
// const line2 = new THREE.Line(geometry2, material);
// const line3 = new THREE.Line(geometry3, material);
// const line4 = new THREE.Line(geometry4, material);
// globe.add(line);
// globe.add(line2);
// globe.add(line3);
// globe.add(line4);
var numPoints = 3;

spline = new THREE.SplineCurve3([
    new THREE.Vector3(2, 1, 1),
    new THREE.Vector3(0, 1, 4),
    new THREE.Vector3(0, 4, 4),
    // new THREE.Vector3(4, 8, 0),
]);
spline2 = new THREE.SplineCurve3([
    new THREE.Vector3(-1, 2, 1),
    new THREE.Vector3(-1, 2, 4),
    new THREE.Vector3(-4, 2, 4),
    // new THREE.Vector3(4, 8, 0),
]);
spline3 = new THREE.SplineCurve3([
    new THREE.Vector3(1, -1, 0),
    new THREE.Vector3(1, -3, -3),
    new THREE.Vector3(3, -4, -3),
    // new THREE.Vector3(4, 8, 0),
]);
spline4 = new THREE.SplineCurve3([
    new THREE.Vector3(-1, -1, 1),
    new THREE.Vector3(-1, -4, 2),
    new THREE.Vector3(-4, -4, 3),
    // new THREE.Vector3(4, 8, 0),
]);

var geometry = new THREE.Geometry();
var splinePoints = spline.getPoints(numPoints);

for (var i = 0; i < splinePoints.length; i++) {
    geometry.vertices.push(splinePoints[i]);
}

var line = new THREE.Line(geometry, material);

var geometry2 = new THREE.Geometry();
var splinePoints2 = spline2.getPoints(numPoints);

for (var i = 0; i < splinePoints2.length; i++) {
    geometry2.vertices.push(splinePoints2[i]);
}

var line2 = new THREE.Line(geometry2, material);

var geometry3 = new THREE.Geometry();
var splinePoints3 = spline3.getPoints(numPoints);

for (var i = 0; i < splinePoints3.length; i++) {
    geometry3.vertices.push(splinePoints3[i]);
}

var line3 = new THREE.Line(geometry3, material);

var geometry4 = new THREE.Geometry();
var splinePoints4 = spline4.getPoints(numPoints);

for (var i = 0; i < splinePoints4.length; i++) {
    geometry4.vertices.push(splinePoints4[i]);
}

var line4 = new THREE.Line(geometry4, material);
globe.add(line);
globe.add(line2);
globe.add(line3);
globe.add(line4);

scene.add(globe);

render();

function render() {
    requestAnimationFrame(render);
    rotateAroundWorldAxis(globe, new THREE.Vector3(0, 1, 0), targetRotationX);
    rotateAroundWorldAxis(globe, new THREE.Vector3(1, 0, 0), targetRotationY);

    targetRotationY = targetRotationY * (1 - slowingFactor);
    targetRotationX = targetRotationX * (1 - slowingFactor);
    globe.rotation.y += 0.001;

    renderer.render(scene, camera);
}

function rotateAroundWorldAxis(object, axis, radians) {
    var rotationMatrix = new THREE.Matrix4();

    rotationMatrix.makeRotationAxis(axis.normalize(), radians);
    rotationMatrix.multiply(object.matrix); // pre-multiply
    object.matrix = rotationMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
}

function onDocumentMouseDown(event) {
    event.preventDefault();

    document
        .getElementById("sect")
        .addEventListener("mousemove", onDocumentMouseMove, false);
    document
        .getElementById("sect")
        .addEventListener("mouseup", onDocumentMouseUp, false);
    document
        .getElementById("sect")
        .addEventListener("mouseout", onDocumentMouseOut, false);

    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDownX = targetRotationX;

    mouseYOnMouseDown = event.clientY - windowHalfY;
    targetRotationOnMouseDownY = targetRotationY;
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;

    targetRotationX = (mouseX - mouseXOnMouseDown) * 0.00025;

    mouseY = event.clientY - windowHalfY;

    targetRotationY = (mouseY - mouseYOnMouseDown) * 0.00025;
}

function onDocumentMouseUp(event) {
    document
        .getElementById("sect")
        .removeEventListener("mousemove", onDocumentMouseMove, false);
    document
        .getElementById("sect")
        .removeEventListener("mouseup", onDocumentMouseUp, false);
    document
        .getElementById("sect")
        .removeEventListener("mouseout", onDocumentMouseOut, false);
}

function onDocumentMouseOut(event) {
    document
        .getElementById("sect")
        .removeEventListener("mousemove", onDocumentMouseMove, false);
    document
        .getElementById("sect")
        .removeEventListener("mouseup", onDocumentMouseUp, false);
    document
        .getElementById("sect")
        .removeEventListener("mouseout", onDocumentMouseOut, false);
}