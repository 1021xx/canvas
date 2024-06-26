const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
// 사용하고있는 디바이스의 dpr값 확인 | 1px = dpr 맥2 윈도우1
// console.log(window.devicePixelRatio)
const dpr = window.devicePixelRatio

let canvasWidth
let canvasHeight
let particles

// 화면사이즈 대응
function init() {
  canvasWidth = innerWidth
  canvasHeight = innerHeight

  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  // canvas w*h기본값 300*150
  // 선명하게하기위해 dpr을 곱해줌
  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  ctx.scale(dpr, dpr)

  particles = []

  const TOTAL = canvasWidth / 20

  for (let i = 0; i < TOTAL; i++) {
    const x = randomNumBetween(0, canvasWidth)
    const y = randomNumBetween(0, canvasHeight)
    const radius = randomNumBetween(50, 100)
    const vy = randomNumBetween(1, 5)
    const particle = new Particle(x, y, radius, vy)
    particles.push(particle)
  }
}



// dat-gui controls
const feGaussianBlur = document.querySelector('feGaussianBlur')
const feColorMatrix = document.querySelector('feColorMatrix')

const controls = new function () {
  this.blurValue = 40
  this.alphaChannel = 100
  this.alphaOffset = -23
  this.acc = 1.03
}

let gui = new dat.GUI()

// 폴더생성
const f1 = gui.addFolder('Gooey Effect')
f1.open()

// controls 속성추가
f1.add(controls, 'blurValue', 0, 100).onChange(value => {
  feGaussianBlur.setAttribute('stdDeviation', value)
})

f1.add(controls, 'alphaChannel', 1, 200).onChange(value => {
  feColorMatrix.setAttribute('values', `1 0 0 0 0 
  0 1 0 0 0 
  0 0 1 0 0 
  0 0 0 ${value} ${controls.alphaOffset}`)
})

f1.add(controls, 'alphaOffset', -40, 40).onChange(value => {
  feColorMatrix.setAttribute('values', `1 0 0 0 0 
  0 1 0 0 0 
  0 0 1 0 0 
  0 0 0 ${controls.alphaChannel} ${value}`)
})

const f2 = gui.addFolder('Particle Property')
f2.open()

//가속도
f2.add(controls, 'acc', 1, 1.5, 0.01).onChange(value => {
  particles.forEach(particle => particle.acc = value)
})


class Particle {
  constructor(x, y, radius, vy) {
    this.x = x
    this.y = y
    this.radius = radius
    this.vy = vy
    this.acc = 1.03 //가속도(중력)
    //this.acc = 0.98 // 멈추는효과
  }

  update() {
    this.vy *= this.acc
    this.y += this.vy
  }

  draw() {
    ctx.beginPath() // 시작하기
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360) // (x, y, raius, startangle, endAngel, 시계방향/반시계방향 )
    ctx.fillStyle = 'orange'
    ctx.fill() // 채우기
    // ctx.stroke() // 선
    ctx.closePath() //끝내기
  }
}

const x = 100
const y = 100
const radius = 50
const particle = new Particle(x, y, radius)

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min
}


let interval = 1000 / 60
let now, delta
let then = Date.now()

function animate() {
  window.requestAnimationFrame(animate)
  now = Date.now()
  delta = now - then

  if (delta < interval) return

  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  // x를 1px 이동시키기

  particles.forEach(particle => {
    particle.update()
    particle.draw()

    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius
      particle.x = randomNumBetween(0, canvasWidth)
      particle.radius = randomNumBetween(50, 100)
      particle.vy = randomNumBetween(1, 5)
    }
  })

  then = now - (delta % interval)
}

window.addEventListener('load', () => {
  init()
  animate()
})

window.addEventListener('resize', () => {
  init()
})