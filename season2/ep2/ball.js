const Ball = () => {
    const o = createElement('./image/ball.png', 100, 220)

    o.speedX = 5
    o.speedY = 5
    o.fired = false

    o.fire = () => {
        o.fired = true
    }

    o.move = () => {
        // bail early
        if (!o.fired) {
            return
        }

        // 从现在出发的位置，先来判断要不要调转方向轴的速度
        if (o.x <= 0 || o.x + o.image.width >= 400) {
            o.speedX *= -1
        }
        if (o.y <= 0 || o.y + o.image.height >= 300) {
            o.speedY *= -1
        }

        o.x = clamp(o.x + o.speedX, 0, 400)
        o.y = clamp(o.y + o.speedY, 0, 300)
    }

    o.isHitting = (ele) => {
        // 因为异步，还不能够在初始化的时候设置 o.width = o.image.width，可以的话，会更加方便
        // 角和边对上的时候，也算重叠
        if (o.x + o.image.width >= ele.x && o.x <= ele.x + ele.image.width) {
            return (o.y + o.image.height >= ele.y && o.y <= ele.y + ele.image.height)
        }
    }

    // 调用这个函数的前提就是，已经确认两个 elements 正在碰撞（矩形重叠）
    // 根据 x轴 和 y轴 上面投影的重叠距离哪个大哪个小，来判断反弹的方向
    o.bounceOff = (ele) => {
        const totalX = o.image.width + ele.image.width
        if (o.x <= ele.x) {
            overlapX = totalX - (ele.x + ele.image.width - o.x)
        } else if (o.x + o.image.width >= ele.x + ele.image.width) {
            overlapX = totalX - (o.x + o.image.width - ele.x)
        } else {
            overlapX = Math.min(o.image.width, ele.image.width)
        }

        const totalY = o.image.height + ele.image.height
        if (o.y <= ele.y) {
            overlapY = totalY - (ele.y + ele.image.height - o.y)
        } else if (o.y + o.image.height >= ele.y + ele.image.height) {
            overlapY = totalY - (o.x + o.image.height - ele.x)
        } else {
            overlapY = Math.min(o.image.height, ele.image.height)
        }

        if (overlapX >= overlapY) {
            o.speedY *= -1
        } else {
            o.speedX *= -1
        }
    }

    return o
}
