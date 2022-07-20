let canvas
let context
let gameloop

let pSize = 40
let pX= 40
let pY

let left = false
let right = false
let up = false
let down = false

let lubangSize = 40
let lubangX
let lubangY

let road
let car
let stone
let nyawa = 3

window.onload = function () {
  window.resizeTo(
    window.screen.availWidth,
    window.screen.availHeight
  );
  canvas = document.getElementById('canvasku')
  context = canvas.getContext('2d');
  road = new Image()
  road.src = "./asset/road.jpg"

  car = new Image()
  car.src = "./asset/car.png"

  stone = new Image()
  stone.src = "./asset/stone.png"

  pX = 80
  pY = canvas.height - pSize

  lubangX = Math.round(Math.random() * 4) * lubangSize
  lubangY = -lubangSize

  gameloop = setInterval(draw, 100);
  belok()
}

function draw() {
  aspal()
  mobil()
  batu()
  hidup()
}

function aspal() {
  context.drawImage(road, 0, 0, canvas.width, canvas.height);


}

function mobil() {
  context.drawImage(car, pX, pY, pSize, pSize);


  if (left) {
    pX -= pSize
    if (pX < 0) {
      pX = 0
    }
  } else if (right) {
    pX += pSize
    if (pX > canvas.width - pSize) {
      pX = canvas.width - pSize
    }
  }
}

function hidup() {
  context.font = "20px Arial";
  context.fillStyle = 'white'
  context.fillText(`Sisa Nyawa : ${nyawa}`,20, 300);
}

function netral(){
  left = false
  right = false
  up = false
  down = false
}

function simulateLeft(){
left = true
}

function simulateRight(){
right = true
}


function belok() {
  document.addEventListener('keydown', (e) => {
    console.log(e);
    if (e.key === "a") {
      left = true
      right = false
      up = false
      down = false
    } else if (e.key === "d") {
      left = false
      right = true
      up = false
      down = false
    } else if (e.key === "w") {
      up = true
      down = false
      left = false
      right = false
    } else if (e.key === "s") {
      up = false
      down = true
      left = false
      right = false
    }
  })

  document.addEventListener('keyup', (e) => {
    if (e.key === "a") {
      left = false
      right = false
    } else if (e.key === "d") {
      left = false
      right = false
    } else if (e.key === "w") {
      up = false
      down = false
      left = false
      right = false
    } else if (e.key === "s") {
      up = false
      down = false
      left = false
      right = false
    }
  })
}

function batu() {
  lubangY += lubangSize

  if (lubangY > canvas.height - pSize) {
    lubangY = 0
    lubangX = Math.round(Math.random() * 4) * lubangSize
  }
  console.log(lubangX);

  context.drawImage(stone, lubangX, lubangY, lubangSize, lubangSize);


  if (lubangX == pX && lubangY == pY) {
    nyawa--;
    console.log(nyawa);
    if (nyawa == 0){
      clearInterval(gameloop)
      if (confirm('Mobil Tergelincir, Ulangi ?!')) {
        window.location.reload()
      } else {
        alert('Silahkan Tekan "F5" untuk memulai permainan')
      }
    }
  }
}

window.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
};
