const Scene_game_over = (game) => {
    const s = {
        game
    }

    s.update = () => {

    }

    s.draw = () => {
        game.drawText('Game Over', 140, 180)
    }

    return s
}