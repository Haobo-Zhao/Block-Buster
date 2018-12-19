var Ball = function (game) {
    var image = game.images['ball']
    var o = {
        image: image,
        x: 150,
        y: 200,
        w: image.width,
        h: image.height,
        speedX: 2,
        speedY: 2,
        fired: false,
    }

    o.fire = () => {
        o.fired = true
    }

    o.move = () => {
        // 在这里不处理超出边界的情况，让 game.clam 函数来处理，基本就是重新设置一下 x 和 y
        if (o.fired) {
            o.x += o.speedX
            o.y += o.speedY
            if (o.x < 0 || o.x + o.image.width > 400) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y + o.image.height > 300) {
                o.speedY *= -1
            }
        }
    }

    o.hit = (element) => {
        return (
            // 刚刚贴在一起不算碰撞，一定要在此时此刻有重叠的部分才算碰撞，所以没有等于号
            (o.x + o.image.width > element.x && o.x < element.x + element.image.width)
            && (o.y + o.image.height > element.y && o.y < element.y + element.image.height)
        )
    }

    o.bounceOff = (element) => {
        // 确认碰撞之后执行的函数
        // 先算 头 到 尾 的距离，在右边的东西，最右边的位置算头
        var spanX = Math.max(o.x + o.image.width, element.x + element.image.width) - Math.min(o.x, element.x)
        var spanY = Math.max(o.y + o.image.height, element.y + element.image.height) - Math.min(o.y, element.y)
        // 重叠的长度
        // 因为确定碰撞，所以 spanX 一定小于 o.image.height + element.image.height， y方向类似
        var overlapX = o.image.width + element.image.width - spanX
        var overlapY = o.image.height + element.image.height - spanY
        if (overlapX === overlapY) {
            // 对角线撞上来
            o.speedX *= -1
            o.speedY *= -1
        } else if (overlapX > overlapY) {
            // 上下撞
            o.speedY *= -1
        } else {
            // 左右撞
            o.speedX *= -1
        }
    }

    return o
}
