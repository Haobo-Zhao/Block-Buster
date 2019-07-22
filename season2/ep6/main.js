// 入口函数，每一个程序都应该有且只有一个入口函数
const __main = () => {
    const images = {
        paddle: './image/paddle.png',
        ball: './image/ball.png',
        brick: './image/brick1.png',
    }
    // const game = Game(images, (g) => {
    //     const scene_gaming = Scene_gaming(g)

    //     g.update = () => {
    //         scene_gaming.update()
    //     }

    //     g.draw = () => {
    //         scene_gaming.draw()
    //     }
    // })
    const game = Game(images, (g) => {
        const scene_game = Scene_gaming(g)
        g.setScene(scene_game)
    })

    game.enableDebugMode(true)
    // game will run after loading is complete
    game.loads()
}
