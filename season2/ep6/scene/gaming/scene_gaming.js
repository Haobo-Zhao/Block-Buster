class Scene_Gaming {
    constructor(game) {
        this.game = game

        this.initialize()
    }

    initialize() {
        window.bricks = game.loadLevel(1)
        const paddle = Paddle(game)
        const ball = Ball(game)

        // 把事件注册进 game 里面
        game.registerAction('a', () => {
            paddle.moveLeft()
        })
        game.registerAction('d', () => {
            paddle.moveRight()
        })
        game.registerAction(' ', () => {
            ball.fire()
        })

        // mechanism of dragging ball
        game.canvas.addEventListener('mousedown', (event) => {
            const x = event.offsetX
            const y = event.offsetY
            if (ball.hasPoint(x, y)) {
                ball.dragging = true
            }
        })
        game.canvas.addEventListener('mousemove', (event) => {
            if (ball.dragging) {
                // mousemove 的单位是 physical pixel
                // 在 canvas 里面移动 ball 的时候，单位是 CSS pixel
                // 在浏览器放大比例不是 1 的时候，会有一个差别，所以需要做一个转换
                const dxPhysical = event.movementX
                const dyPhysical = event.movementY
                const zoomLevel = window.devicePixelRatio
                const dxCSS = dxPhysical / zoomLevel
                const dyCSS = dyPhysical / zoomLevel
                ball.moveBy(dxCSS, dyCSS)
            }
        })
        game.canvas.addEventListener('mouseup', (event) => {
            ball.dragging = false
        })
    }

    // 会覆盖 完成初始化的 game 的 game.update()
    update() {
        if (ball.y >= paddle.y + paddle.h) {
            const scene_game_over = Scene_Game_Over(game)
            game.setScene(scene_game_over)
            // 不 return 其实也没有问题，
            // 因为这个时候，game.update() 和 game.draw() 函数内调用 scene_game_over.update() 和 scene_game_over.draw()
            return
        }

        // check if ball is hitting other elements in current position, and change correspondingly when necessary
        if (ball.isHitting(paddle)) {
            ball.bounceOff(paddle)
        }
        for (b of window.bricks) {
            if (b.alive() && ball.isHitting(b)) {
                ball.bounceOff(b)
                b.break()
                game.addScore(100)
            }
        }
        ball.move()
    }

    // 同 s.update()
    draw() {
        game.drawScore()
        game.drawElement(paddle)
        game.drawElement(ball)
        for (b of window.bricks) {
            if (b.alive()) {
                game.drawElement(b)
            }
        }
    }
}
