//  canvas painter
//  ES6
//  author by stephenliu

class Painter {
  constructor(options) {
  	console.log(options)
    this.container = document.querySelector(options.container)
    this.height = options.height
    this.width = options.width
    this.controls = {
      tool: this.tool.bind(this),
      color: this.color.bind(this),
      brushSize: this.brushSize.bind(this),
      save: this.save.bind(this),
      openFile: this.openFile.bind(this),
      openURL: this.openURL.bind(this)
    }
    this.tools = {
      line: this.line.bind(this),
      erase: this.erase.bind(this),
      text: this.text.bind(this),
      spray: this.spray.bind(this),
      rectangles: this.rectangles.bind(this)
    }
  }

  init() {
  	let canvas = this.createElt('canvas', { width: this.width, height: this.height })
  	let ctx = canvas.getContext('2d')
  	let toolbar = this.createElt('div', { class: 'toolbar' })
  	let panel = this.createElt('div', { class: 'picturepanel' }, canvas)
  	for (let name in this.controls) {
  	  toolbar.appendChild(this.controls[name](ctx))
  	}
  	if (this.container) {
  	  this.container.appendChild(this.createElt('div', null, panel, toolbar))
  	}
  }

  // -------------------
  //      controls
  // -------------------
  tool(ctx) {
  	let select = this.createElt('select')
  	for (let name in this.tools) {
  	  select.appendChild(this.createElt('option', null, name))
  	}

  	ctx.canvas.addEventListener('mousedown', (e) => {
  	  if (e.which === 1) {
  	  	this.tools[select.value](e, ctx)
  	  	e.preventDefault()
  	  }
  	})

  	return this.createElt('span', null, 'Tools: ', select)
  }

  color(ctx) {
  	let input = this.createElt('input', { type: 'color' })
  	input.addEventListener('change', () => {
  	  ctx.fillStyle = input.value
  	  ctx.strokeStyle = input.value
  	})
  	return this.createElt('span', null, 'Color: ', input)
  }

  brushSize(ctx) {
  	let select = this.createElt('select')
  	let sizes = [1, 2, 3, 5, 8, 12, 25, 35, 50, 75, 100]
  	sizes.forEach((size) => {
  	  select.appendChild(this.createElt('option', { value: size }, size + ' pixels'))
  	})
  	select.addEventListener('change', () => {
  	  ctx.lineWidth = select.value
  	})
  	return this.createElt('span', null, "Brush Sizes: ", select)
  }

  save(ctx) {
  	let link = this.createElt('a', { href: '/', target: '_blank' }, 'Save')
  	let update = () => {
  	  try {
  	  	link.href = ctx.canvas.toDataURL()
  	  } catch(e) {
  	  	if (e instanceof SecurityError) {
  	  	  link.href = "javascript:alert(" + JSON.stringify("Can't save: " + e.toString()) + ")"
  	  	}
        else {
          throw e
        }
  	  }
  	}
  	link.addEventListener('mouseover', update)
  	link.addEventListener('focus', update)
  	return link
  }

  openFile(ctx) {
  	let input = this.createElt('input', { type: 'file' })
  	input.addEventListener('change', () => {
  	  if (input.files.length === 0) return
  	  let reader = new FileReader()
  	  reader.addEventListener('load', () => {
  	  	this.loadImageUrl(ctx, reader.result)
  	  })
  	  reader.readAsDataURL(input.files[0])
  	})
  	return this.createElt('div', null, 'Open File: ', input)
  }

  openURL(ctx) {
  	let input = this.createElt('input', { type: 'text' })
  	let form = this.createElt('form', null, 'Open URL: ', input, this.createElt('button', { type: 'submit' }, 'load'))
  	form.addEventListener('submit', (e) => {
  	  e.preventDefault()
  	  this.loadImageUrl(ctx, form.querySelector('input').value)
  	})
  	return form
  }
  //  -----------------
  //       tools
  //  -----------------
  line(event, ctx, onEnd) {
  	ctx.lineCap = 'round'
  	let pos = this.relativePos(event, ctx.canvas)
  	this.trackDrag((e) => {
  	  ctx.beginPath()
  	  ctx.moveTo(pos.x, pos.y)
  	  pos = this.relativePos(e, ctx.canvas)
  	  ctx.lineTo(pos.x, pos.y)
  	  ctx.stroke()
  	}, onEnd)
  }

  erase(event, ctx) {
  	ctx.globalCompositeOperation = "destination-out"
  	this.line(event, ctx, () => {
  	  ctx.globalCompositeOperation = 'source-over'
  	})
  }

  text(event, ctx) {
  	let text = prompt('Text: ', '')
  	if (text) {
  	  let pos = this.relativePos(event, ctx.canvas)
  	  ctx.font = Math.max(7, ctx.lineWidth) + 'px sans-serif'
  	  ctx.fillText(text, pos.x, pos.y)
  	}
  }

  spray(event, ctx) {
  	let radius = ctx.lineWidth / 2
  	let area = radius * radius * Math.PI
  	let dotsPerTick = Math.ceil(area / 30)
  	let currentPos = this.relativePos(event, ctx.canvas)
  	let _sparay = setInterval(() => {
  	  for (let i = 0; i < dotsPerTick; i++) {
  	  	let offset = this.randomPointInRadius(radius)
  	  	ctx.fillRect(currentPos.x + offset.x, currentPos.y + offset.y, 1, 1)
  	  }
  	}, 25)
  	this.trackDrag((e) => {
  	  currentPos = this.relativePos(e, ctx.canvas)
  	}, () => {
  	  clearInterval(_sparay)
  	})
  }
  //  -----------------
  //       helper
  //  -----------------
  relativePos(e, el) {
  	let rect = el.getBoundingClientRect()
  	return {
  	  x: Math.floor(e.clientX - rect.left),
  	  y: Math.floor(e.clientY - rect.top)
  	}
  }

  trackDrag(onMove, onEnd) {
  	let end = (e) => {
  	  removeEventListener('mousemove', onMove)
  	  removeEventListener('mouseup', end)
  	  if (onEnd) onEnd(e)
  	}
  	addEventListener('mousemove', onMove)
  	addEventListener('mouseup', end)
  }

  randomPointInRadius(radius) {
  	for (;;) {
  	  let x = Math.random() * 2 - 1
  	  let y = Math.random() * 2 - 1
  	  if (x * x + y * y <= 1) {
  	  	return {
  	  	  x: x * radius,
  	  	  y: y * radius
  	  	}
  	  }
  	}
  }

  loadImageUrl(ctx, url) {
  	let img = document.createElement('img')
  	img.addEventListener('load', () => {
  	  let color = ctx.fillStyle
  	  let size = ctx.lineWidth
  	  ctx.canvas.width = img.width
  	  ctx.canvas.height = img.height
  	  ctx.drawImage(img, 0, 0)
  	  ctx.fillStyle = color
  	  ctx.strokeStyle = color
  	  ctx.lineWidth = size
  	})
  	img.src = url
  }

  createElt(name, props, ...args) {
  	let node = document.createElement(name)
  	if (props) {
  	  for (let prop in props) {
  	  	if (props.hasOwnProperty(prop)) {
  	  	  node.setAttribute(prop, props[prop])
  	  	}
  	  }
  	}
  	args.forEach((item) => {
  	  if (typeof item === 'string') {
  	  	item = document.createTextNode(item)
  	  }
  	  node.appendChild(item)
  	})

  	return node
  }
}