class SceneEditor extends Scene {
    constructor(game) {
        super(game)
        this.init()
        this.__bindingEvents()
    }

    static instance(game) {
        this.i = this.i || new this(game)
        this.i.init()
        return this.i
    }

    // 提供这个接口，好给每一次切换到 editor 的时候，初始化场景里面的东西的状态
    init() {
        this.game.editing = true
        this.level = []
        this.b = null
    }

    // editor 里面的事件，只有在 editor 这个场景里面才触发
    // 通过 game.editing 来判断是不是在 editor 这个场景里面
    // 当然也可以直接用场景的名字来判断，这样对每个场景的触发事件判断的时候，都能够通用
    __bindingEvents() {
        // 鼠标放进来的时候，再去创建这块 shadow brick
        this.game.canvas.addEventListener('mouseenter', (event) => {
            if (!this.game.editing) {
                return
            }
            this.b = Brick(this.game)
        })

        // shadow brick 跟随鼠标，而且是一格一格的效果
        this.game.canvas.addEventListener('mousemove', (event) => {
            if (!this.game.editing) {
                return
            }
            if (!this.b) {
                return
            }

            const mouseX = event.offsetX
            const mouseY = event.offsetY
            // 一格一格的排列效果
            const newX = (mouseX - this.b.w / 2) - (mouseX - this.b.w / 2) % 25
            const newY = (mouseY - this.b.h / 2) - (mouseY - this.b.h / 2) % 10
            const limitX = this.game.canvas.width - this.b.w
            const limitY = 220 - this.b.h
            const newPos = {
                x: clamp(newX, 0, limitX),
                y: clamp(newY, 0, limitY),
            }
            Object.assign(this.b, newPos)
        })

        this.game.canvas.addEventListener('mousedown', (event) => {
            if (!this.game.editing) {
                return
            }
            const pos = [this.b.x, this.b.y]
            this.level.push(pos)
        })

        // 切换到 title 场景
        window.addEventListener('keydown', (event) => {
            if (!this.game.editing) {
                return
            }
            const k = event.key
            if (k === 'f') {
                this.save()
                const s = SceneTitle.instance(this.game)
                this.game.setScene(s)
                this.game.editing = false
            }
        })
    }

    drawInfo() {
        this.game.drawText('editor', 20, 250)
        this.game.drawText('press f to save and finish editing', 20, 290)

        const c = this.game.context
        c.beginPath();
        c.moveTo(0, 220);
        c.lineTo(400, 220);
        c.stroke();
    }

    drawShadowBrick() {
        // draw current shadow brick
        this.game.context.save()
        this.game.context.globalAlpha = 0.4;
        this.b && this.game.drawElement(this.b)
        this.game.context.restore()
    }

    drawSavedBricks() {
        for (const pos of this.level) {
            const x = pos[0]
            const y = pos[1]
            const b = Brick(this.game, x, y)
            this.game.drawElement(b)
        }
    }

    draw() {
        this.drawInfo()
        this.drawSavedBricks()
        this.drawShadowBrick()
    }

    // 保存到全局变量 levels，也可以 JSON.stringify() 之后，存到localStorage，就可以持久化了
    save() {
        if (this.level.length == 0) {
            return
        }
        window.levels.push(this.level)
        // use window.localStorage for local persistency
        const data = JSON.stringify(window.levels)
        window.localStorage.setItem('levels', data)
    }
}
