class SceneEditor extends Scene {
    constructor(game) {
        super(game)
        this.init()
        this.__bindingEvents()
    }

    init() {
        this.level = []
        this.b = Brick(this.game, 0, 0)
        window.image = this.b.image
        window.image.style.opacity = 0.8
        this.b.image.style.opacity = "0.4"
        log(this.b.image)
        document.getElementsByTagName('body')[0].appendChild(window.image)
    }

    __bindingEvents() {
        this.game.canvas.addEventListener('mousemove', (event) => {
            const x = event.offsetX
            const y = event.offsetY
            // 一格一格的排列效果
            const newX = (x - this.b.w / 2) - (x - this.b.w / 2) % 25
            const newY = (y - this.b.h / 2) - (y - this.b.h / 2) % 20
            const pos = {
                x: clamp(newX, 0, 400 - this.b.w),
                y: clamp(newY, 0, 300 - this.b.h),
            }
            Object.assign(this.b, pos)
        })
    }

    update() {

    }

    draw() {
        this.game.drawText('editor', 200, 200)

        this.game.context.save()
        this.game.context.globalAlpha = 0.4;
        this.game.drawElement(this.b)
        this.game.context.restore()
    }

    saveLevel() {

    }
}
