var Paddle = function (game) {
    var image = game.images['paddle']
    var o = {
        image: image,
        x: 128,
        y: 256,
        w: image.width,
        h: image.height,
        speed: 6,
    }

    // 把挡板自己的运动逻辑，装到自己本身里面来，然后外面的函数直接调用就可以，不需要在外面来写逻辑
    o.moveLeft = function () {
        o.x -= o.speed
    }
    o.moveRight = function () {
        o.x += o.speed
    }
    o.moveUp = function () {
        o.y -= o.speed
    }
    o.moveDown = function () {
        o.y += o.speed
    }

    return o
}
