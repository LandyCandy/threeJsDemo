import React from 'react'
import Animator from './Animator'
import AudioAnalyser from './AudioAnalyser'
import * as THREE from '../../lib/three'

let cameraSpec = {fov: 75, aspect: window.innerWidth / window.innerHeight, near: 0.1, far: 1000}
let renderSpec = {width: window.innerWidth, height: window.innerHeight}
let torusSpec = {radius: 10, tube: 3, tubularSegments: 200, radialSegments: 32, p: 2, q: 5}
let audioSource = 'music/seven_nation_glitch.ogg';

export default class {

    constructor() {
      this.torusKnots = {};
      this.renderer = true;
      this.scene = true;
      this.camera = true;
      this.domElement = this.buildScene();
      this.addTorus(this.scene, 0, 0, 'mid');
      this.addTorus(this.scene, -30 , 0, 'left');
      this.addTorus(this.scene, 30, 0, 'right');
      this.addLight(this.scene, this.camera);
      this.analyser = this.addAudio(this.camera, audioSource);
      this.ani = new Animator(this);
    }

    addNewAudio(source) {
      this.analyser.pauseAudio()
      this.analyser = this.addAudio(this.camera, source);
      this.ani = new Animator(this);
    }

    buildScene() {
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(cameraSpec.fov, cameraSpec.aspect, cameraSpec.near, cameraSpec.far);

        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(renderSpec.width, renderSpec.height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        return renderer.domElement;
    }

    addTorus(scene, x, y, label) {
        let geometry = new THREE.TorusKnotGeometry(torusSpec.radius, torusSpec.tube, torusSpec.tubularSegments, torusSpec.radialSegments, torusSpec.p, torusSpec.q);
        let material = new THREE.MeshLambertMaterial({
            color: 0x0033dd
        });

        this.torusKnots[label] = new THREE.Mesh(geometry, material);
        this.torusKnots[label].position.x = x;
        this.torusKnots[label].position.y = y;
        scene.add(this.torusKnots[label]);
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

    getReactComponent() {
      let Scene = this;
      let SceneComponent = React.createClass({
        componentDidMount: function () {
          this.refs.canvasDiv.appendChild(Scene.domElement);
        },
        render : function () {
          return (
            <div ref="canvasDiv" className="canvas-container"></div>
          )
        }
      })
      return SceneComponent;
    }
}
