import React, { Component } from 'react';
import life from './life';
import './App.css';

const COLORS = [
  'white',
  'black',
  'red',
  'blue',
  'green',

]

/**
 * life canvas
 */
class LifeCanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.life = new life(props.width, props.height);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => { this.animFrame() });
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    let cells = this.life.getCells();

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, this.props.width, this.props.height)

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // // Here is the screen buffer array we can manipulate:

    // imageData.data[0] = 0;
    // imageData.data[1] = 0;
    // imageData.data[2] = 0;

    // Set the pixel at 10,20 to pure red and display on the canvas:

    let buffer = imageData.data; // Obtained from getImageData()

    for (let row = 0; row < this.props.height; row++) {
      for (let col = 0; col < this.props.width; col++) {
        let index = (row * this.props.width + col) * 4;

        let currentNumber = cells[row][col];

        buffer[index + 0] = COLORS[currentNumber][0]; // Red: 0xff == 255, full intensity
        buffer[index + 1] = COLORS[currentNumber][1]; // Green: zero intensity
        buffer[index + 2] = COLORS[currentNumber][2]; // Blue: zero intensity
        buffer[index + 3] = 0xff; // Alpha: 0xff == 255, fully opaque
      }
    }

    ctx.putImageData(imageData, 0, 0);

    //ctx.putImageData(imageData, 0, 0);
    this.life.step();
    requestAnimationFrame(() => { this.animFrame() });
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
  }
}

/**
 * life holder component
 */
class LifeApp extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div>
        <LifeCanvas width={400} height={300} />
      </div>
    )
  }
}

/**
 * Outer App component
 */
class App extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div className="App">
        <LifeApp />
      </div>
    );
  }
}

export default App;