// 一个控制器
// 其实既是是一个虚拟类，也是一个实体类，因为画布在里面,还做了设置，
// 那个setTimeout函数，是整个画面动起来的核心，也是一直做各种碰撞检测的核心

var Game = function() {
    var canvas = document.getElementById('id-canvas')
    var context = canvas.getContext('2d')
    var game = {}
    game.canvas = canvas
    game.context = context

    // 两个对象，一个存哪些键按下对应的动作，一个存当前有哪些键是按下的
    game.actions = {}
    game.keydowns = {}

    // events 事件，响应一个输入，可能是鼠标点啊，也可能是键盘按了一个键啊，之类的

    // 有键按下
    window.addEventListener('keydown', function(event) {
        var key = event.key
        if (key == ' ') {
            game.keydowns[key] = !game.keydowns[key]
        }
        else {
            game.keydowns[key] = true
        }
    })

    // 有键被放开，弹起来了
    window.addEventListener('keyup', function(event) {
        var key = event.key
        if (key != ' ') {
            game.keydowns[key] = false
        }
    })

    game.update = function() {}
    game.draw = function() {}

    game.collide = function() {}

    // 注册函数，提供一个借口给外界， 在函数之外，定义一个按键对应的动作
    game.registerAction = function(key, callback) {
        game.actions[key] = callback
    }

    // 把一个图形画到画布上面来
    game.drawImage = function(img) {
        game.context.drawImage(img.image, img.x, img.y)
    }

    // 精彩的递归函数
    // 这么干，可以每一次跑了runLoop之后，都重新设置一遍setTimeout的时间
    // 而之前的setInterval，只执行一次
    game.runLoop = function() {
        // 判断球和挡板有没有撞上,如果撞了，做什么。
        // 以及球和砖块撞没撞
        // 要在循环执行时间的函数之前，对球的两个方向的速度做出正确的处理。
        game.collide()


        // 遍历按下的键，执行对应的动作，让程序动起来
        // 这就相当于刷新了数据
        // 刷新数据之后，总要记得重新画图
        // var actions = Object.keys(game.actions)
        // var key
        // for (var i = 0; i < actions.length; i++) {
        //     key = actions[i]
        //     if (game.keydowns[key]) {
        //         game.actions[key]()
        //     }
        // }
        // 只看一共有哪些动作，从最直接的对象身上来找，动作那当然是从动作本身对象本身来找
        for (var key in game.actions) {
            if (game.keydowns[key]) {
                game.actions[key]()
            }
        }

        // 这两个函数应该是从外面注册进来，
        // 说得更加明白点就是，这里先用这两个函数占个位置，
        // 他们的具体定义从外面定义进来

        // 有注册机，这个东西不需要了
        // update 更新数据
        // game.update()

        // 因为draw里面要画求和板子了，相当于调用2次，
        // 所以不能再drawImage()里面清干净画布，
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height)


        // draw 根据数据，把画面画出来，也就是渲染,当然，已经处理了画之前
        // 先把画布弄干净了
        game.draw()

        // next round
        //  这是让程序动起来，画布刷新，等等操作的真正部分
        // 精彩的开关设计
        // 全局变量用来实时更新帧率
        setTimeout(function() {
            game.runLoop()
        }, 1000 / window.fps)

    }

    return game
}
