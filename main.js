var __main = function() {
    var imagePaths = {
        ball: 'ball.png',
        paddle: 'paddle.png',

        brick1: 'brick1.png',
        brick2: 'brick2.png',
        brick3: 'brick3.png',
    }

    // 开始创建变量和设置游戏
    var game = Game()
   

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
        var scene = scene_gaming(g)
        game.run_with_scene(scene)
    })
}
