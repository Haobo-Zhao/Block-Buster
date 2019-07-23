
class SceneGameover extends Scene {
    constructor(game) {
        super(game)
        this.__init()
    }

    __init() {
        this.__bindEvents()
    }

    __bindEvents() {
        window.addEventListener('keydown', (event) => {
            const k = event.key
            if (k === 'r') {
                const s = SceneTitle.instance(this.game)
                this.changeSceneTo(s)
            }
        })
    }

    update() {

    }

    draw() {
        this.game.drawText('Game Over', 100, 100)
        this.game.drawText('Press r to replay', 100, 160)
    }

    changeSceneTo(scene) {
        this.game.setScene(scene)
    }
}
