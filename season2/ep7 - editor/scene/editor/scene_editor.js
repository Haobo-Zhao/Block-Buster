class SceneEditor extends Scene {
    constructor(game) {
        super(game)
        this.init()
        this.__bindingEvents()
    }

    init() {
        this.level = []
    }

    __bindingEvents() {
        this.game.canvas.addEventListener('mouseenter', (event) => {
            this.b = Brick(this.game)
        })

        this.game.canvas.addEventListener('mousemove', (event) => {
            if (!this.b) {
                return
            }
            const mouseX = event.offsetX
            const mouseY = event.offsetY
            // 一格一格的排列效果
            const newX = (mouseX - this.b.w / 2) - (mouseX - this.b.w / 2) % 25
            const newY = (mouseY - this.b.h / 2) - (mouseY - this.b.h / 2) % 10
            const limitX = this.game.canvas.width - this.b.w
            const limitY = 220 - this.b.w
            const newPos = {
                x: clamp(newX, 0, limitX),
                y: clamp(newY, 0, limitY),
            }
            Object.assign(this.b, newPos)
        })

        this.game.canvas.addEventListener('mousedown', (event) => {
            const newB = Brick(this.game, this.b.x, this.b.y)
            this.level.push(newB)
            log(this.level)
        })
    }

    update() {

    }

    drawInfo() {
        this.game.drawText('editor', 20, 290)

        const c = this.game.context
        c.beginPath();
        c.moveTo(0, 200);
        c.lineTo(400, 200);
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
        for (const b of this.level) {
            this.game.drawElement(b)
        }
    }

    draw() {
        this.drawInfo()

        this.drawShadowBrick()

        this.drawSavedBricks()
    }

    saveLevel() {

    }
}
