import * as THREE from 'three'
//import './style.css'
import  'https://rawgit.com/jeromeetienne/threex.domevents/master/threex.domevents.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const container = document.querySelector(".background");
const scene = new THREE.Scene();

let titanModel;

function createCircleTexture(color, size) {
    var matCanvas = document.createElement('canvas');
    matCanvas.width = matCanvas.height = size;
    var matContext = matCanvas.getContext('2d');
    // create texture object from canvas.
    var texture = new THREE.Texture(matCanvas);
    // Draw a circle
    var center = size / 2;
    matContext.beginPath();
    matContext.arc(center, center, size/2
    , 0, 2 * Math.PI, false);
    matContext.closePath();
    matContext.fillStyle = color;
    matContext.fill();
    // need to set needsUpdate
    texture.needsUpdate = true;
    // return a texture made from the canvas
    return texture;
  }


const camera = new THREE.PerspectiveCamera(
    70, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000);

    const particleGeometry = new THREE.BufferGeometry();
    const counts = 9000;

    const positions = new Float32Array(counts * 3)

    
for (let i = 0; i < counts; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;  // X position
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;  // Y position
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;  // Z position
}
    particleGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
        size: 20,
        map: createCircleTexture('#fff', 256),
        transparent: true,
        depthWrite: false
    });
    particlesMaterial.size = 0.1;
    particlesMaterial.sizeAttenuation = true;

    const particles = new THREE.Points(particleGeometry, particlesMaterial)
    

    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    scene.add(particles)
    const sphereGeometry = new THREE.SphereGeometry(15, 64, 64);

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('./textures/Titan_baseColor.png');

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            emissive: 0xffffff, // Set the emissive color (white)
            emissiveIntensity: 10, // Increase the intensity for vibrancy
            roughness: 1, // Adjust the roughness as needed
            metalness: 0.5 // Adjust the metalness as needed
        });

        const sphere = new THREE.Mesh(sphereGeometry, material);
        sphere.position.x = 0;
        scene.add(sphere);
        const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

    camera.position.z = 50;
   const clock = new THREE.Clock();
   const angle = THREE.MathUtils.degToRad(0.1);
   const textContainer = document.createElement('div');
   textContainer.classList.add('text-container');
   document.body.appendChild(textContainer);

   const text1 = document.createElement('div');
   text1.innerText = 'Titan';
   textContainer.appendChild(text1);

    const text2 = document.createElement('div');
   text2.innerText = 'City';
   textContainer.appendChild(text2); 

   const text3 = document.createElement('div');
   text3.innerText = '3023';
   textContainer.appendChild(text3); 

   const imgContainer = document.createElement('div');
imgContainer.classList.add('img-container');
document.body.appendChild(imgContainer);

const img = document.createElement('img');
img.src = 'hacktivistsLogo.jpg'; // Replace with the actual path of your image
imgContainer.appendChild(img);

   // Add CSS for text styling
   const style = document.createElement('style');
   style.textContent = `
   @font-face {
    font-family: myFirstFont;
    src: url(AnkhSanctuary-nROx4.ttf);
    }
   .text-container {
       position: absolute;
       top: 50%;
       left: 55%;
       width: 100%;
       transform: translate(-50%, -50%);
       text-align: left;
       font-family: myFirstFont;
       /* font-family: 'Oswald', sans-serif; */
       color: orange;
       font-size: 200px;
       opacity: 0;
       transition: opacity 1s ;
       transition-timing-function: ease-out;
   }
   .img-container {
    position: absolute;
    top: 10%;
    right: -50%;
    width: 100%;
    transform: translate(-50%, -50%);
    text-align: right;    
    opacity: 0;
    transition: opacity 1s ;
    //transition-timing-function: ease-out;
  }
  .img-container img {
    width: 7vw; /* Allow the width to adjust based on the aspect ratio of the image */
    height: 14vh; /* Allow the height to adjust based on the aspect ratio of the image */
    }
  
   `;
   //document.head.appendChild(style);
   //imgContainer.style.opacity = '1';
   
   
       //Zooming in to sphere
       let isZoomed = false;
       function zoomSphere() {
           const targetRadius = 28;
           const step = 0.5;
            const targetaxis = 50;
           function increaseRadius() {
               if (sphere.geometry.parameters.radius < targetRadius) {
                  sphere.geometry = new THREE.SphereGeometry(sphere.geometry.parameters.radius + step, 64, 64);
                  if(sphere.position.x < targetaxis){
                    sphere.position.x += 0.5;
                  }
                   requestAnimationFrame(increaseRadius);
               } else {
                   isZooming = false;
                   document.head.appendChild(style);
                   textContainer.style.opacity = '1';
                   imgContainer.style.opacity = '1';
                   setTimeout(() => {
                       window.location.href = "second.html";
                     }, 2500);
               }
           }
       
           increaseRadius();
       }
       let isZooming = false;
       domEvents.addEventListener(sphere, 'click', function(event) {
           if (!isZooming) {
               isZooming = true;
               zoomSphere();
           }
          // window.open('www.google.com')
       }); 
   function animate() {
     const time = clock.getElapsedTime();
     const elapsedTime = clock.getElapsedTime();
     particles.position.x = -elapsedTime * 0.1
     sphere.rotateY(-1*angle);
     sphere.rotateX(angle);

     requestAnimationFrame(animate);
     renderer.render(scene, camera);

   }
   const loader = new GLTFLoader();


animate()
