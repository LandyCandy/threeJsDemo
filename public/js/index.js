import SceneLoader from './SceneLoader'

let mod = new SceneLoader();

let render = function() {
    requestAnimationFrame(render);

    mod.torusKnot.rotation.x += 0.01;
    mod.torusKnot.rotation.y += 0.01;

    mod.torusKnot.scale.setScalar(mod.analyser.getAverageFrequency()/100);

    mod.renderer.render(mod.scene, mod.camera);
};

render();
