const el = e => document.querySelector(e)

// 调试的时候，可以直接暴露一个全局变量出来，然后 log 出来， 就可以了
let log = console.log.bind(console)

const clamp = (val, min, max) => {
    if (val < min) {
        return min
    } else if (val > max) {
        return max
    } else {
        return val
    }
}

// 创造一张图片的功能包装成，或者叫抽象成，一个函数，这样就方便以后再用了，棒！
const imageFromPath = (path) => {
    const i = new Image()
    i.src = path
    return i
}

const createElement = (pathOfImage, x, y) => {
    const ele = {}

    ele.image = imageFromPath(pathOfImage)
    ele.x = x
    ele.y = y

    return ele
}