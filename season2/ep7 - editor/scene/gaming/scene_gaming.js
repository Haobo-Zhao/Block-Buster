class SceneGaming extends Scene {
    constructor(game) {
        super(game)
        this.init()
        this.__bindEvents()
    }

    __bindEvents() {
        // 把事件注册进 game 里面
        this.game.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        this.game.registerAction('d', () => {
            this.paddle.moveRight()
        })
        this.game.registerAction(' ', () => {
            this.ball.fire()
        })

        // mechanism of dragging ball
        this.game.canvas.addEventListener('mousedown', (event) => {
            const x = event.offsetX
            const y = event.offsetY
            if (this.ball.hasPoint(x, y)) {
                this.ball.dragging = true
            }
        })
        this.game.canvas.addEventListener('mousemove', (event) => {
            if (this.ball.dragging) {
                // mousemove 的单位是 physical pixel
                // 在 canvas 里面移动 ball 的时候，单位是 CSS pixel
                // 在浏览器放大比例不是 1 的时候，会有一个差别，所以需要做一个转换
                const dxPhysical = event.movementX
                const dyPhysical = event.movementY
                const zoomLevel = window.devicePixelRatio
                const dxCSS = dxPhysical / zoomLevel
                const dyCSS = dyPhysical / zoomLevel
                this.ball.moveBy(dxCSS, dyCSS)
            }
        })
        this.game.canvas.addEventListener('mouseup', (event) => {
            this.ball.dragging = false
        })
    }

    // 设置这个场景里面的游戏元素，挡板啊，砖块啊，之类的
    init() {
        window.bricks = this.game.loadLevel(1)
        this.paddle = Paddle(this.game)
        this.ball = Ball(this.game)
    }

    // 会覆盖 完成初始化的 game 的 this.game.update()
    update() {
        if (this.ball.y >= this.paddle.y + this.paddle.h) {
            const scene_game_over = SceneGameover.instance(this.game)
            this.game.setScene(scene_game_over)
            // 不 return 其实也没有问题，
            // 因为这个时候，this.game.update() 和 this.game.draw() 函数内调用 scene_game_over.update() 和 scene_game_over.draw()
            return
        }

        // check if ball is hitting other elements in current position, and change correspondingly when necessary
        if (this.ball.isHitting(this.paddle)) {
            this.ball.bounceOff(this.paddle)
        }
        for (const b of window.bricks) {
            if (b.alive() && this.ball.isHitting(b)) {
                this.ball.bounceOff(b)
                b.break()
                this.game.addScore(100)
            }
        }
        this.ball.move()
    }

    // 同 s.update()
    draw() {
        this.game.drawScore()
        this.game.drawElement(this.paddle)
        this.game.drawElement(this.ball)
        for (const b of window.bricks) {
            if (b.alive()) {
                this.game.drawElement(b)
            }
        }
    }
}
