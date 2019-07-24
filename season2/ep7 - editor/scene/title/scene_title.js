class SceneTitle extends Scene {
    constructor(game) {
        super(game)
        this.init()
        this.__bindEvents()
    }

    init() {
        // assign a name to the instance of the scene for identification
        this.name = 'title'
    }

    __bindEvents() {
        window.addEventListener('keydown', (event) => {
            // 可以判断 game.scene.name 或者类似的，能够知道正在跑的是哪个 scene 的办法
            // 来决定允不允许触发这些事件
            if (this.game.scene.name !== 'title') {
                return
            }
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
