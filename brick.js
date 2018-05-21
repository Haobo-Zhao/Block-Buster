var Brick = function(positionX, positionY) {
    var img = imageFromPath('brick.png')
    var o = {
        image: img,
        x: positionX,
        y: positionY,
        width: brickWidth,
        height: brickHeight,
        alive: true,
    }
    o.kill = function() {
        o.alive = false
    }

    o.collide = function(ball) {
        if (o.alive) {
            if (collide(o, ball)) {
                o.kill()
                ball.bounce()
            }
        }
    }
    return o
}
