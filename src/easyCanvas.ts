class CanvasUtils extends CanvasRenderingContext2D {
  static init(selector = "body", name = "canvas") {
    document.querySelector(
      selector
    ).innerHTML = `<canvas id='${name}'></canvas>`;

    let ctx = (document.querySelector(
      `canvas#${name}`
    ) as HTMLCanvasElement).getContext("2d");

    // styles
    ctx.canvas.style.display = "block";
    ctx.canvas.style.background = "black";
    ctx.canvas.style.userSelect = "none";

    return ctx;
  }

  static resize(
    ctx: CanvasRenderingContext2D,
    width = window.innerWidth,
    height = window.innerHeight
  ) {
    ctx.canvas.width = width;
    c.canvas.height = height;
  }

  static animate(ctx: CanvasRenderingContext2D, callback) {
    // clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    callback();

    // repeat
    requestAnimationFrame(() => {
      CanvasUtils.animate(ctx, callback);
    });
  }

  static getRandomLocation(
    context: CanvasRenderingContext2D,
    w = context.canvas.width,
    h = context.canvas.height
  ) {
    return {
      x: Math.floor(0 + Math.random() * (w - 0)),
      y: Math.floor(0 + Math.random() * (h - 0))
    };
  }
}

class Circle {
  sides = {
    top: null,
    bottom: null,
    left: null,
    right: null
  };

  constructor(
    private ctx: CanvasRenderingContext2D,
    private loc = CanvasUtils.getRandomLocation(c),
    private r = randomInt(10, 50),
    private dx = 1,
    private dy = 1,
    private options = {
      detectWalls: true
    }
  ) {
    this.draw();
  }

  update() {
    this.sides = {
      top: this.loc.y - this.r,
      bottom: this.loc.y + this.r,
      left: this.loc.x - this.r,
      right: this.loc.x + this.r
    };

    // handle collisions
    this.detectWalls();

    // update
    this.loc.x += this.dx;
    this.loc.y += this.dy;

    this.draw();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "lime";
    this.ctx.arc(this.loc.x, this.loc.y, this.r, 0, Math.PI * 2);
    this.ctx.fill();
  }

  detectWalls() {
    if (this.options.detectWalls) {
      // sides
      if (this.sides.right > this.ctx.canvas.width || this.sides.left < 0)
        this.dx *= -1;

      // top and bottom
      if (this.sides.bottom > this.ctx.canvas.height || this.sides.top < 0)
        this.dy *= -1;
    }
  }
}

function randomInt(min = 0, max = 100) {
  return Math.floor(random(min, max));
}

function random(min = 0, max = 1) {
  return min + Math.random() * (max - min);
}

// # Event listeners
window.addEventListener("load", () => {
  init();
  CanvasUtils.resize(c);

  window.addEventListener("resize", () => {
    init();
    CanvasUtils.resize(c);
  });

  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // console.log(mouse);
  });

  window.addEventListener("mouseover", () => {
    mouse.active = true;
  });

  window.addEventListener("mouseleave", () => {
    mouse.active = false;
  });
});
