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
            if (k === 'Enter') {
                const s = SceneGaming.instance(this.game)
                s.setElements()
                this.game.setScene(s)
            }
        })
    }

    draw() {
        this.game.drawText('Press Enter to play', 60, 160)
    }
}
