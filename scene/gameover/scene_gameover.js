// 用面向对象来重构
class scene_gameover {
    constructor(game) {
        var self = this
        self.game = game
        self.scene = {}
        self.update = function() {}
        self.collide = function() {}
        self.draw = function() {
            self.game.context.font = "40px Arial"
            self.game.context.fillText("Game Over",(canvasWidth - 40 * 9) / 2, (canvasHeight - 40) / 2)
            self.game.context.fillText("Press r to restart",(canvasWidth - 40 * 9) / 2, 
            (canvasHeight - 40) / 2 + 100)
        }

        window.addEventListener('keydown', function(event) {
            if (window.gameover && event.key == 'r') {
                window.gameover = false
                // 在为了和刚刚打开html文件的时候的效果一样
                // 一开始球是不动的，按了空格才走
                self.game.keydowns[' '] = undefined
                var restart = new scene_gaming(self.game)
                self.game.run_with_scene(restart)
            }
        })
    }

    static new(game) {
        this.i = this.i || new this(game)
        return this.i
    }
}

// var scene_gameover = function(game) {
//     var scene = {}
//     scene.collide = function() {}
//     scene.draw = function() {
//         game.context.font = "40px Arial"
//         game.context.fillText("Game Over",(canvasWidth - 40 * 9) / 2, (canvasHeight - 40) / 2)
//         game.context.fillText("Press r to restart",(canvasWidth - 40 * 9) / 2, 
//                                                    (canvasHeight - 40) / 2 + 100)
//     }

//     window.addEventListener('keydown', function(event) {
//         if (window.gameover && event.key == 'r') {
//             window.gameover = false
//             // 在为了和刚刚打开html文件的时候的效果一样
//             // 一开始球是不动的，按了空格才走
//             game.keydowns[' '] = undefined
//             var restart = scene_gaming(game)
//             game.run_with_scene(restart)
//         }
//     })

//     return scene
// }