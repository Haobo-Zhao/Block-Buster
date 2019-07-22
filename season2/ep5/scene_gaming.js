const Scene_gaming = (game) => {
    const s = {
        game
    }

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

    // 传到 在初始化 game 完成之后，重新定义的 game.update() 里面去
    s.update = () => {
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
    s.draw = () => {
        game.drawScore()
        game.drawElement(paddle)
        game.drawElement(ball)
        for (b of window.bricks) {
            if (b.alive()) {
                game.drawElement(b)
            }
        }
    }

    return s
}
