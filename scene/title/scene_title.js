// var Scene_title = function (game) {
//     var scene = {}

//     scene.update = () => {

//     }

//     scene.draw = () => {
//         game.context.font = '30px Consolas'
//         game.context.fillText('Press K To Start', 10, 200)
//     }

//     // 有一点很有意思的就是，这些事件都是绑定到在函数里面被创建的这个对象里面，所以
//     window.addEventListener('keydown', (event) => {
//         if (event.key === 'k') {
//             var scene = Scene_gaming(game)
//             game.setScene(scene)
//         }
//     })

//     return scene
// }

class Scene_title extends Scene {
    constructor(game) {
        super(game)
        // 有一点很有意思的就是，这些事件都是绑定到在函数里面被创建的这个对象里面，所以
        window.addEventListener('keydown', (event) => {
            if (event.key === 'k') {
                var scene = Scene_gaming.new(game)
                game.setScene(scene)
            }
        })
    }

    draw() {
        this.game.context.font = '30px Consolas'
        this.game.context.fillText('Press K To Start', 10, 200)
    }
}