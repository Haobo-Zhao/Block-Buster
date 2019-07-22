// 入口函数，每一个程序都应该有且只有一个入口函数
const __main = () => {
    const images = {
        paddle: './image/paddle.png',
        ball: './image/ball.png',
        brick: './image/brick1.png',
    }
    const game = Game(images, () => {
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
                dxPhysical = event.movementX
                dyPhysical = event.movementY
                zoomLevel = window.devicePixelRatio
                dxCSS = dxPhysical / zoomLevel
                dyCSS = dyPhysical / zoomLevel
                ball.moveBy(dxCSS, dyCSS)
            }
        })
        game.canvas.addEventListener('mouseup', (event) => {
            ball.dragging = false
        })

        // 在 Game 的定义外面，把更新和渲染逻辑加上来
        game.update = () => {
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

        game.draw = () => {
            game.drawScore()
            game.drawElement(paddle)
            game.drawElement(ball)
            for (b of window.bricks) {
                if (b.alive()) {
                    game.drawElement(b)
                }
            }
        }
    })
    game.enableDebugMode(true)
    // game will run after loading is complete
    game.loads()
}
