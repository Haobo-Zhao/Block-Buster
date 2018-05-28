var Brick = function(position) {
    var img = imageFromPath('brick' + (position[2] || 1) + '.png')
    var o = {
        image: img,
        x: position[0],
        y: position[1],
        width: brickWidth,
        height: brickHeight,
        health: position[2] || 1,
        alive: true,
    }
    o.kill = function() {
        o.health--
        if (o.health > 0) {
            o.image.src = 'brick' + o.health + '.png'
        }
        if (o.health <= 0) {
            o.alive = false
        }
    }

    o.collide = function(ball) {
        if (o.alive) {
            if (collide(o, ball)) {
                o.kill()
                window.score += 100
                ball.bounce()
            }
        }
    }
    return o
}
