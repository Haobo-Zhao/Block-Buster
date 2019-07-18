// 入口函数，每一个程序都应该有且只有一个入口函数
const __main = () => {
    const game = Game()
    game.enableDebugMode(true)
    const paddle = Paddle()
    const ball = Ball()
    const bricks = []
    for (let i = 0; i < 3; i++) {
        const b = Brick(i * 100 + 70, 120)
        bricks.push(b)
    }

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

    // 在 game 外面，把 game 的更新和渲染逻辑加上来
    game.update = () => {
        // check if ball is hitting other elements in current position, and change correspondingly
        if (ball.isHitting(paddle)) {
            ball.bounceOff(paddle)
        }
        for (b of bricks) {
            if (b.alive() && ball.isHitting(b)) {
                ball.bounceOff(b)
                b.break()
            }
        }
        ball.move()
    }

    game.draw = () => {
        game.drawElement(paddle)
        game.drawElement(ball)
        for (b of bricks) {
            if (b.alive()) {
                game.drawElement(b)
            }
        }
    }
}
