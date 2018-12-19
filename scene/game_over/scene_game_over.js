class Scene_game_over extends Scene {
    constructor(game) {
        super(game)
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                var scene = Scene_title.new(game)
                game.setScene(scene)
            }
        })
    }

    // 呈现的东西，画出来的东西
    draw() {
        this.game.context.font = 'px Consolas'
        this.game.context.fillText('Game Over', 10, 150)
        this.game.context.fillText('Press Enter To Back To Title Page', 10, 200)
    }
}
