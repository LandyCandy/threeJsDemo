import AudioAnalyser from './AudioAnalyser'
import * as THREE from '../../lib/three'

let cameraSpec = {fov: 75, aspect: window.innerWidth / window.innerHeight, near: 0.1, far: 1000}
let renderSpec = {width: window.innerWidth, height: window.innerHeight}
let torusSpec = {radius: 10, tube: 3, tubularSegments: 200, radialSegments: 32, p: 2, q: 5}
let audioSource = 'music/valkyrie.ogg';

export default class {

    constructor() {
      this.torusKnot = true;
      this.renderer = true;
      this.scene = true;
      this.camera = true;
      this.buildScene();
      this.addTorus(this.scene);
      this.addLight(this.scene, this.camera);
      this.analyser = this.addAudio(this.camera, audioSource);
    }

    buildScene() {
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(cameraSpec.fov, cameraSpec.aspect, cameraSpec.near, cameraSpec.far);

        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(renderSpec.width, renderSpec.height);
        document.body.appendChild(renderer.domElement);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
    }

    addTorus(scene) {
        let geometry = new THREE.TorusKnotGeometry(torusSpec.radius, torusSpec.tube, torusSpec.tubularSegments, torusSpec.radialSegments, torusSpec.p, torusSpec.q);
        let material = new THREE.MeshLambertMaterial({
            color: 0x0033dd
        });

        this.torusKnot = new THREE.Mesh(geometry, material);
        scene.add(this.torusKnot);
    }

    addLight(scene, camera) {
        // White directional light at half intensity shining from the top.
        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
        scene.add(directionalLight);

        // white ambient light at 20%
        let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        camera.position.z = 40;
    }

    addAudio(camera, audioSource) {
        return new AudioAnalyser(camera, audioSource);
    }
}
