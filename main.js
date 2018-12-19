// 启动游戏
var __main = function () {
    var images = {
        paddle: 'img/paddle.png',
        ball: 'img/ball.png',
        brick: 'img/brick.png',
    }

    // 这里的作用是先把回调传进来，然后通过下面的 game.run()来加载图片，
    // 在图片都加载完成之后，这个回调才会被调用
    var game = Game.instance(images, (g) => {
        var scene = Scene_title.new(g)
        g.runWithScene(scene)
    })

    game.run()
}

__main()
