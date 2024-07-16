import { useEffect, useRef } from 'react'
import { Engine, Render, Runner, Mouse, MouseConstraint, Composite, Bodies } from 'matter-js'

import '../style/containers/RotateCanvas.scss'

import IconAFRAME from '../assets/icon_AFRAME.png'
import IconCSS from '../assets/icon_CSS.png'
import IconHTML from '../assets/icon_HTML.png'
import IconJS from '../assets/icon_JS.png'
import IconREACT from '../assets/icon_REACT.png'
import IconTHREE from '../assets/icon_THREE.png'

const RotateCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const cw = 1000
    const ch = 1000

    let engine, render, runner, mouse, mouseConstraint

    initScene()
    initMouse()
    initGround()
    initImageBoxes()

    function initScene(){
      engine = Engine.create()
      render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
          width: cw,
          height: ch,
          wireframes: false,
          background: '#1b1b19'
        }
      })
      runner = Runner.create()

      Render.run(render)
      Runner.run(runner, engine)
    }

    function initMouse(){
      mouse = Mouse.create(canvas)
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse
      })
      Composite.add(engine.world, mouseConstraint)
    }

    function initGround(){
      const segments = 32
      const deg = (Math.PI * 2) / segments
      const width = 50
      const radius = cw / 2 + width / 2
      const height = radius * Math.tan(deg / 2) * 2

      for (let i = 0; i < segments; i++) {
        const theta = deg * i
        const x = radius * Math.cos(theta) + cw / 2
        const y = radius * Math.sin(theta) + ch / 2
        addRect(x, y, width, height, { isStatic: true, angle: theta })
      }
    }

    function initImageBoxes() {
      const scale = 0.7
      const t1 = { w: 250 * scale, h: 250 * scale}
      const t2 = { w: 732 * scale, h: 144 * scale}

      // https://brm.io/matter-js/docs/classes/Body.html#property_render.sprite.texture
      // https://brm.io/matter-js/docs/classes/Body.html#property_render.sprite.xScale
      addRect(cw/2, ch/2, t1.w, t1.h, {
        chamfer: { radius: 20},
        render: { sprite: { texture: IconJS, xScale: 0.7, yScale: 0.7 } }
      })
      addRect(cw/2 - t1.w, ch/2, t1.w, t1.h, { 
        render: { sprite: { texture: IconCSS, xScale: 0.7, yScale: 0.7 } }
      })
      addRect(cw/2 + t1.w, ch/2, t1.w, t1.h, { 
        render: { sprite: { texture: IconHTML, xScale: 0.7, yScale: 0.7 } }
      })
      addRect(cw/2, ch/2 + t1.h, t2.w, t2.h, { 
        render: { sprite: { texture: IconAFRAME, xScale: 0.7, yScale: 0.7 } }
      })
      addRect(cw/2 - t1.w,  ch/2 + t1.h, t1.w, t1.h, {
        chamfer: { radius: 75},
        render: { sprite: { texture: IconREACT, xScale: 0.7, yScale: 0.7 } }
      })
      addRect(cw/2, ch/2, t1.w, t1.h, { 
        render: { sprite: { texture: IconTHREE, xScale: 0.7, yScale: 0.7 } }
      })
    }

    // https://brm.io/matter-js/demo/#mixed
    

    function addRect(x, y, w, h, options = {}) {
      const rect = Bodies.rectangle(x, y, w, h, options)
      Composite.add(engine.world, rect)
    }
  }, [])

  return (
    <div className="rotate-canvas-wrapper">
      <canvas ref={canvasRef}></canvas>
      <aside>
        <h1>Javascript</h1>
        <h2>⭐⭐⭐⭐⭐</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Provident iusto tempora expedita est porro tenetur, possimus et
          laboriosam minus ullam, cum voluptatum, iste soluta quis ad. Quasi
          voluptatibus autem quo.
        </p>
      </aside>
    </div>
  )
}

export default RotateCanvas