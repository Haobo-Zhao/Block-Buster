class SceneTitle extends Scene {
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
            let s = null
            // bail early
            if (k !== 'Enter' && k !== 'e') {
                return
            }
            if (k === 'Enter') {
                s = SceneGaming.instance(this.game)
            } else if (k === 'e') {
                s = SceneEditor.instance(this.game)
            }
            s.init()
            this.game.setScene(s)
        })
    }

    draw() {
        this.game.drawText('Press Enter to play', 60, 160)
        this.game.drawText('Press e to create levels', 60, 200)
    }
}
