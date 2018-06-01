var Brick = function(images, position) {
    var img = images['brick' + (position[2] || 1)]
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
            o.image = images['brick' + o.health]
        }
        if (o.health <= 0) {
            o.alive = false
        }
    }

    o.collide = function(ball) {
        if (o.alive) {
            // if (collide(o, ball)) {
            //     o.kill()
            //     window.score += 100
            //     ball.bounce()
            // }

            var brick = o

            var rightMost = Math.max(brick.x + brick.width, ball.x + ball.width)
            var leftMost = Math.min(brick.x, ball.x)
            var overlapX = brick.width + ball.width - (rightMost - leftMost)

            var upMost = Math.min(brick.y, ball.y)
            var downMost = Math.max(brick.y + brick.height, ball.y + ball.height)
            var overlapY = brick.height + ball.height - (downMost - upMost)

            if (overlapX > 0 && overlapY > 0) {
                // 撞到砖块上下
                if (overlapX > overlapY) {
                    ball.speedY *= -1
                }
                // 撞到砖块左右
                else if (overlapY > overlapX) {
                    ball.speedX *= -1
                }
                // 正正从对角线撞进来
                else {
                    ball.speedX *= -1
                    ball.speedY *= -1
                }

                o.kill()
                window.score += 100

                log('Current direction of ball: ' + (ball.speedX > 0 ? 'right' : 'left')  
                + ' ' + (ball.speedY > 0 ? 'down' : 'up'))
            }
        }
    }
    return o
}
