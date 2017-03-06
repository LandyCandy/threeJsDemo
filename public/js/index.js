import React from 'react'
import ReactDOM from 'react-dom'
import SceneLoader from './SceneLoader'
import Controls from './Controls'

let mod = new SceneLoader();

let render = function () {
  requestAnimationFrame(render);
  mod.ani.render();
}

render();

let CanvasElement = mod.getReactComponent();

ReactDOM.render(
  <div>
    <CanvasElement />
    <Controls scene={mod}/>
  </div>,
  document.getElementById('root')
);
