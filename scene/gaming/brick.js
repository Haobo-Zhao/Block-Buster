var Brick = function (position, game) {
    // position 的数据结构是 [x坐标, y坐标]
    var p = position
    var image = game.images['brick']
    var o = {
        image: image,
        x: position[0],
        y: position[1],
        w: image.width,
        h: image.height,
        health: position[2] || 1,
        alive: true,
    }

    o.hit = () => {
        o.health--
        if (o.health < 1) {
            o.alive = false
        }
    }

    return o
}
