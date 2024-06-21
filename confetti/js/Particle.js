import {
  hexToRgb,
  randomNumbetween
} from "./utils.js"

export default class Particle {
  constructor(x, y, deg = 0, colors, shapes, spread = 30) {
    this.angle = Math.PI / 180 * randomNumbetween(deg - spread, deg + spread) //부채꼴모양
    this.r = randomNumbetween(30, 100)
    this.x = x * innerWidth
    this.y = y * innerHeight

    this.vx = this.r * Math.cos(this.angle)
    this.vy = this.r * Math.sin(this.angle)

    this.friction = 0.89
    this.gravity = 0.5

    this.width = 12
    this.height = 12

    this.opacity = 1

    this.widthDelta = 0
    this.heightDelta = 0

    this.rotation = randomNumbetween(0, 360)
    this.rotationDelta = randomNumbetween(-1, 1)

    this.colors = colors || ['#5aa9e6', '#7fc8f8', '#f9f9f9', '#ffe45e', '#ff6392']
    this.color = hexToRgb(
      this.colors[Math.floor(randomNumbetween(0, this.colors.length))]
    )

    this.shapes = shapes || ['circle', 'square']
    this.shape = this.shapes[
      Math.floor(randomNumbetween(0, this.shapes.length))
    ]
  }

  update() {
    this.vy += this.gravity

    this.vx *= this.friction
    this.vy *= this.friction

    this.x += this.vx
    this.y += this.vy

    this.opacity -= 0.005

    this.widthDelta += 2
    this.heightDelta += 2

    this.rotation += this.rotationDelta

  }

  drawSquare(ctx) {
    ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos(Math.PI / 180 * this.widthDelta),
      this.height * Math.sin(Math.PI / 180 * this.heightDelta))
  }

  drawCircle(ctx) {
    ctx.beginPath()
    ctx.ellipse(
      this.x,
      this.y,
      Math.abs(this.width * Math.cos(Math.PI / 180 * this.widthDelta)) / 2, // Math.abs 절대값
      Math.abs(this.height * Math.sin(Math.PI / 180 * this.heightDelta)) / 2,
      0, 0,
      Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }

  draw(ctx) {
    ctx.translate(this.x + this.width * 1.2, this.y + this.height * 1.2)
    ctx.rotate(Math.PI / 180 * this.rotation)
    ctx.translate(-this.x - this.width * 1.2, -this.y - this.height * 1.2)

    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`

    switch (this.shape) {
      case 'square':
        this.drawSquare(ctx);
        break

      case 'circle':
        this.drawCircle(ctx);
        break
    }

    ctx.resetTransform()

  }

}