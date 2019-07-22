const Brick = (game, x, y) => {
    const o = game.createElement('brick', x, y)

    o.health = 1

    o.break = () => {
        o.health = Math.min(o.health - 1, 0)
    }
    o.alive = () => {
        return o.health >= 1
    }

    return o
}
