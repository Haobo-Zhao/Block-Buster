class SceneEditor extends Scene {
    constructor(game) {
        super(game)
        this.init()
        this.__bindingEvents()
    }

    init() {
    }

    __bindingEvents() {
        this.game.canvas.addEventListener('mouseenter', (event) => {
            this.level = []
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
            const newY = (mouseY - this.b.h / 2) - (mouseY - this.b.h / 2) % 20
            const newPos = {
                x: clamp(newX, 0, this.game.canvas.width - this.b.w),
                y: clamp(newY, 0, this.game.canvas.height - this.b.h),
            }
            Object.assign(this.b, newPos)
        })
    }

    update() {

    }

    draw() {
        this.game.drawText('editor', 200, 200)

        this.game.context.save()
        this.game.context.globalAlpha = 0.4;
        this.b && this.game.drawElement(this.b)
        this.game.context.restore()
    }

    saveLevel() {

    }
}
