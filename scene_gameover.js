var scene_gameover = function(game) {
    var scene = {}
    scene.collide = function() {}
    scene.draw = function() {
        game.context.font = "40px Arial"
        game.context.fillText("Game Over",(canvasWidth - 40 * 9) / 2, (canvasHeight - 40) / 2)
        game.context.fillText("Press r to restart",(canvasWidth - 40 * 9) / 2, 
                                                   (canvasHeight - 40) / 2 + 100)
    }

    window.addEventListener('keydown', function(event) {
        if (window.gameover && event.key == 'r') {
            window.gameover = false
            console.log(game)
            var restart = scene_gaming(game)
            game.run_with_scene(restart)
        }
    })

    return scene
}