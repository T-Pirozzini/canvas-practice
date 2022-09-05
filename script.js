let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = function () {
  canvas = document.getElementById('canvas1');
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate();
}

window.addEventListener('resize', function() {
  cancelAnimationFrame(flowFieldAnimation)
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate();
});

const mouse = {
  x: 0,
  y: 0,
}
window.addEventListener('mousemove', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
})

class FlowFieldEffect {
  #ctx;
  #width;
  #height;
  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#ctx.strokeStyle = 'white';
    this.#ctx.lineWidth = 5;
    this.#width = width;
    this.#height = height;
    this.angle = 0;      
  }
  #draw(x, y) {
    const length = 300;
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    this.#ctx.lineTo(mouse.x, mouse.y);
    this.#ctx.stroke();
  }
  animate() {
    this.angle += 0.1;
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    this.#draw(this.#width/2, this.#height/2);    
    // console.log('animating');
    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
  }
}