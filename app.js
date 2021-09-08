/** @format */
const urlParams = new URLSearchParams(window.location.search);
const urlLine = urlParams.get("lines") || 5;
const urlSpeed = urlParams.get("speed") || 5;
const followMouse = urlParams.get("mouse") || false;
$("#lines").val(urlLine);
$("#speed").val(urlSpeed);

let width = window.innerWidth;
let height = window.innerHeight;
let xPos = width / 2;
let yPos = width / 2;
let speed = parseInt(urlSpeed);
let numLines = parseInt(urlLine) + 1;
console.log(numLines);
let points = [];
for (let i = 0; i < numLines; i++) {
  let point = {
    x: Math.random() * width,
    y: Math.random() * height,
    a: Math.random() * width,
    b: Math.random() * height,
    c: Math.random() * width,
    d: Math.random() * height,
    e: Math.random() * width,
    f: Math.random() * height,
    xdir: Math.random() * speed - speed / 2,
    ydir: Math.random() * speed - speed / 2,
    adir: Math.random() * speed - speed / 2,
    bdir: Math.random() * speed - speed / 2,
    cdir: Math.random() * speed - speed / 2,
    ddir: Math.random() * speed - speed / 2,
    edir: Math.random() * speed - speed / 2,
    fdir: Math.random() * speed - speed / 2,

    xCore: Math.random() * width,
    yCore: Math.random() * height,
  };
  points.push(point);
}
console.log(points);

var c = document.getElementById("myCanvas");
c.setAttribute("width", width);
c.setAttribute("height", height);
var ctx = c.getContext("2d");

ctx.save();
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(200, 400);
ctx.closePath();
ctx.stroke();
ctx.restore();
window.requestAnimationFrame(update);
let counter = 0;
setInterval(update, 1);

function update() {
  if (counter % 10 == 0) {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, width, height);
  }
  //ctx.clearRect(0, 0, width, height);
  counter++;
  for (let i = 0; i < numLines - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(points[i].a, points[i].b);
    if (followMouse) {
      ctx.bezierCurveTo(
        points[i].c,
        points[i].d,
        points[i].e,
        points[i].f,
        xPos,
        yPos
      );
    }
    // ctx.lineTo(points[.i + 1].x, points[i + 1].y);
    // ctx.quadraticCurveTo(points[i].a, points[i].b, xPos, yPos);
    ctx.bezierCurveTo(
      points[i].c,
      points[i].d,
      points[i].e,
      points[i].f,
      points[i].x,
      points[i].y
    );
    // ctx.quadraticCurveTo(
    //   points[i].a,
    //   points[i].b,
    //   points[i + 1].x,
    //   points[i + 1].y
    // );
    // ctx.closePath();
    ctx.lineWidth = 0.05;
    if (i % 7 == 0) {
      ctx.strokeStyle = `rgb(${(points[i].a / width) * 255},${
        (points[i].b / height) * 255
      },${(points[i].c / width) * 255})`;
    } else if (i % 3 == 0) {
      // ctx.strokeStyle = `#0FF`;
    } else {
      // ctx.strokeStyle = `rgb(${(points[i].a / width) * 255},${
      //   (points[i].b / height) * 255
      // },${(points[i].c / width) * 255})`;
    }
    ctx.strokeStyle = `#FFF`;
    ctx.stroke();

    points[i].x += points[i].xdir;
    points[i].y += points[i].ydir;
    points[i].a += points[i].adir;
    points[i].b += points[i].bdir;
    points[i].c += points[i].cdir;
    points[i].d += points[i].ddir;
    points[i].e += points[i].edir;
    points[i].f += points[i].fdir;
    if (points[i].x > width || points[i].x < 0) {
      points[i].xdir *= -1;
    }
    if (points[i].y > height || points[i].y < 0) {
      points[i].ydir *= -1;
    }
    if (points[i].a > width || points[i].a < 0) {
      points[i].adir *= -1;
    }
    if (points[i].b > height || points[i].b < 0) {
      points[i].bdir *= -1;
    }

    if (points[i].c > width || points[i].c < 0) {
      points[i].cdir *= -1;
    }
    if (points[i].d > height || points[i].d < 0) {
      points[i].ddir *= -1;
    }
    if (points[i].e > width || points[i].e < 0) {
      points[i].edir *= -1;
    }
    if (points[i].f > height || points[i].f < 0) {
      points[i].fdir *= -1;
    }
  }
}

function getcoords(e) {
  xPos = e.clientX;
  yPos = e.clientY;
}
