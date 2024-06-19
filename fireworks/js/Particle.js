import CanvasOption from "./CanvasOption.js";

export default class Particle extends CanvasOption {
  constructor(x, y, vx, vy, opacity, colorDeg) {
    super()
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.opacity = opacity
    this.gravity = 0.009
    this.friction = 0.98
    // this.gravity = 0.12
    // this.friction = 0.93
    this.colorDeg = colorDeg
  }

  update() {
    this.vy += this.gravity

    this.x += this.vx
    this.y += this.vy

    this.opacity -= 0.02
  }

  draw() {
    this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65%, ${this.opacity})`
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.closePath()
  }
}