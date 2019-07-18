const Brick = (x, y) => {
    const o = createElement('./image/brick1.png', x, y)

    o.health = 1

    o.break = () => {
        o.health = Math.min(o.health - 1, 0)
    }
    o.alive = () => {
        return o.health >= 1
    }

    return o
}
