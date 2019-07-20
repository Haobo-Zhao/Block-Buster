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

        // 在 game 外面，把 game 的更新和渲染逻辑加上来
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
