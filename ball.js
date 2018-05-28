var Ball = function(images) {
    var img = images['ball']
    var o = {
        image: img,
        x: 140,
        y: 150,
        speedX: 3,
        speedY: 3,
        width: ballWidth,
        height: ballHeight,
        move: function() {
            if (o.x < 0 || o.x + o.width > canvasWidth) {
                o.speedX = - o.speedX
            }
            if (o.y < 0 || o.y + o.height > canvasHeight) {
                o.speedY *= -1
            }
            this.x += this.speedX
            this.y += this.speedY
        },
        bounce: function() {
            this.speedY *= -1
        },
    }
    return o
}
