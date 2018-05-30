window.gameover = false


var e = sel => document.querySelector(sel)

var log = function(message) {
    if (window.gameover) {
        return
    }
    e('#id-textarea').value = message + '\n' + e('#id-textarea').value
}

var collide = function(a, b) {
    return (a.x + a.width > b.x && a.x < b.x + b.width) && (a.y + a.height > b.y && a.y < b.y + b.height)
}

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

// 关卡选择器
var loadLevel = function(images, level) {
    var bricks = []
    // 正常选关从1开始
    // 但是数组的数据是从零开始
    var data = levels[level - 1]
    for (var i = 0; i < data.length; i++) {
        // 分别代表传入一个砖块的x值、y值和血量
        bricks.push(Brick(images, data[i]))
    }
    return bricks
}