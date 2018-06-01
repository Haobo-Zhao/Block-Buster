var __main = function() {
    var imagePaths = {
        ball: 'img/ball.png',
        paddle: 'img/paddle.png',

        brick1: 'img/brick1.png',
        brick2: 'img/brick2.png',
        brick3: 'img/brick3.png',
    }

    // 开始创建变量和设置游戏
    var game = Game.new()
   

    // 把图片加载完成之后，再执行整个程序，就不用同一张图片执行好几次的这种情况出现,
    // 对说的就是你，block。
    game.loadImages = function(paths, callback) {
        var names = Object.keys(paths)
        for (let i = 0; i < names.length; i++) {
            let image = imageFromPath(paths[names[i]])
            image.onload = function() {
                game.images[names[i]] = image
                if (Object.keys(game.images).length == Object.keys(paths).length) {
                    log('Enjoy the show!\nAll images loaded.')
                    callback(game)
                }
            }
        }
    }

    game.loadImages(imagePaths, function(g){
        var scene = new scene_gaming(g)
        game.run_with_scene(scene)

        // 不能放在game.run_with_scene(scene)这个函数里面，
        // 不然会从gameover场景重新开始（切换到gaming场景）
        // 会多次调用runLoop这个函数，每一次刷新画面就刷新好几次，逻辑也是
        // 相当于有好几个runLoop()在跑
        game.runLoop()
    })
}
