import  'https://rawgit.com/jeromeetienne/threex.domevents/master/threex.domevents.js'
import * as THREE from 'three';
import createTextGeometry from 'three-bmfont-text';
import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r74/three.min.js'
import {FontLoader} from './node_modules/three/examples/jsm/loaders/FontLoader.js'
import './style.css'

const container = document.querySelector(".background");
        const scene = new THREE.Scene();

        function createCircleTexture(color, size) {
            // ... (same as your original code)
        }

        const camera = new THREE.PerspectiveCamera(
            70, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );

        const particleGeometry = new THREE.BufferGeometry();
        const counts = 60000;

        const positions = new Float32Array(counts * 3);

        for (let i = 0; i < counts; i++) {
            positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 1.5;
            positions[i * 3 + 1] = (Math.random() - 0.5) * window.innerHeight * 1.5;
            positions[i * 3 + 2] = Math.random() * 100 - 50;
        }

        particleGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
            size: 200,
            map: createCircleTexture('#fff', 128),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        particlesMaterial.size = 0.005;
        particlesMaterial.sizeAttenuation = true;

        const particles = new THREE.Points(particleGeometry, particlesMaterial);
        scene.add(particles);



        const renderer = new THREE.WebGL1Renderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

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

        const light = new THREE.AmbientLight(0x404040); // Ambient light for the whole scene
        light.intensity = 2; // Increase the intensity
        scene.add(light);

        const sphereLight = new THREE.PointLight(0xffffff, 1, 100); // Point light for the sphere
        sphereLight.position.set(-40, 0, 0); // Position the light at the sphere
        sphereLight.intensity = 2; // Increase the intensity
        scene.add(sphereLight);

        camera.position.z = 50;

        window.addEventListener('resize', function(){
            var width = window.innerWidth;
            var height = window.innerHeight;
            renderer.setSize(width,height);
            camera.aspect = width/height;
            camera.updateProjectionMatrix;
        })
        const clock = new THREE.Clock();
        const domEvents = new THREEx.DomEvents(camera, renderer.domElement);
          

        function animateStars() {
            for (let i = 0; i < counts * 3; i += 3) {
                const speed = 0.01;
                positions[i] += Math.sin(i + positions[i] * 0.1) * speed;
                positions[i + 1] += Math.cos(i + positions[i + 1] * 0.1) * speed;
            }
            particleGeometry.attributes.position.needsUpdate = true;
        }
        // Adding Text
    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');
    document.body.appendChild(textContainer);

    const text1 = document.createElement('div');
    text1.innerText = 'Titan City in 3023';
    textContainer.appendChild(text1);

    /* const text2 = document.createElement('div');
    text2.innerText = 'The Hacktivists';
    textContainer.appendChild(text2); */

    // Add CSS for text styling
    const style = document.createElement('style');
    style.textContent = `
    .text-container {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-family: Arial, sans-serif;
        color: white;
        font-size: 100px;
        opacity: 0;
        transition: opacity 1s ;
        transition-timing-function: ease-out;
    }
    `;

/*     const loader = new FontLoader();
    loader.load('font_ess.json', function(font) {

        const textOptions = {
            font: font,
            text: 'Your Text Here',
            align: 'left',
            width: 20 // Adjust as needed
        };
        const geometry = new createTextGeometry(textOptions);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(geometry, material);
        scene.add(textMesh);
    }); */
        
    
//scene.add(textMesh);
    document.head.appendChild(style);
        //Zooming in to sphere
        const angle = THREE.MathUtils.degToRad(0.1);
        let isZoomed = false;
        function zoomSphere() {
            const targetRadius = 28;
            const step = 0.5;
        
            function increaseRadius() {
                if (sphere.geometry.parameters.radius < targetRadius) {
                    sphere.geometry = new THREE.SphereGeometry(sphere.geometry.parameters.radius + step, 64, 64);
                    requestAnimationFrame(increaseRadius);
                } else {
                    isZooming = false;
                    textContainer.style.opacity = '1';
                    setTimeout(() => {
                        window.location.href = "second.html";
                      }, 4000);
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
            requestAnimationFrame(animate);
            animateStars(); 
            // Update sphere position for continuous movement
            //sphere.rotation.x += 0.4;
            //sphere.rotation.y += 0.4;
            sphere.rotateY(-1*angle);
            sphere.rotateX(angle);
            renderer.render(scene, camera);
        }

        animate();

