const Paddle = (game) => {
    const o = game.createElement('paddle', 100, 260)

    o.speed = 5

    o.moveLeft = () => {
        o.x -= o.speed
        o.x = Math.max(0, o.x)
    }
    o.moveRight = () => {
        o.x += o.speed
        o.x = Math.min(400 - o.w, o.x)
    }

    return o
}
