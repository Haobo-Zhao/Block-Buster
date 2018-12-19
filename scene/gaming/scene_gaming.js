// 挡板，球 和 砖块 直接做成全局变量
var paddle = {}
var ball = {};
var bricks = []
var dragging = false
var score = 0

// 加载关卡的实现是改变全局数据 bricks 这个数组
window.loadLevel = (n, g) => {
    var level = levels[n - 1]
    var bricks = []
    for (let i = 0; i < level.length; i++) {
        let position = level[i]
        let brick = Brick(position, g)
        bricks.push(brick)
    }

    return bricks
}

enableDebugMode = (enable, game) => {

    // 用个反逻辑，缩小后面的语句块的层次，因为如果不用的话，就要再套一个大括号    
    if (!enable) {
        return
    }

    // 用滑条来控制球的速度
    var inputFps = document.querySelector('#id-fps')
    inputFps.hidden = false
    inputFps.addEventListener('input', (event) => {
        window.fps = Number(event.target.value)
    })

    // 开始或者暂停游戏
    window.addEventListener('keydown', (event) => {
        var k = event.key
        if (k == ' ') {
            ball.fired = !ball.fired
        } else if ('123456789'.includes(Number(k))) {
            bricks = loadLevel(Number(k), game)
        }
    })

    // 拖动小球的功能
    // 也可以直接加载 canvas 上面来
    window.addEventListener('mousedown', (event) => {
        // offsetX 算上了 canvas 的 border，相当于从border的外面边界开始算起
        // 所以为了准确得到是 canvas 里面的哪个点的坐标，x 和 y 的坐标都要减 1
        var x = event.offsetX - 1
        var y = event.offsetY - 1
        // 有没有点中小球
        if ((x >= ball.x && x <= ball.x + ball.w) && (y >= ball.y && y <= ball.y + ball.h)) {
            dragging = true
        }
    })
    window.addEventListener('mousemove', (event) => {
        if (dragging) {
            ball.x += event.movementX
            ball.y += event.movementY
        }
    })
    window.addEventListener('mouseup', (event) => {
        dragging = false
    })
}

class Scene_gaming extends Scene {
    // 构造函数不会在外面被直接调用
    // 而是只会被 static new(game) 这个静态方法调用
    constructor(game) {
        super(game)
        this.init()
    }

    // 如果 this.instance 已经存在，就不会再执行 Scene 的构造函数，init() 就不会再被执行一次
    static new(game) {
        // 重新初始化这些全局变量
        paddle = Paddle(game)
        ball = Ball(game)
        bricks = loadLevel(1, game)
        score = 0
        // super.new(game) 里面，把 this.instance 给定下来了，如果有，就取，没有，就创个新的
        // 目的就是为了避免重复跑那些绑定事件的函数
        // 其实也有点不好，因为我已经有点记不住父类的静态方法 new 的具体实现了
        var i = super.new(game)
        return i
    }

    init() {
        // 让这个短点的变量名也能用，因为有太多其它的地方用到 g
        var g = this.game

        paddle = Paddle(g)

        ball = Ball(g)

        bricks = loadLevel(1, g)

        // 注册按键对应的函数，好让有那个键按下的时候，运行一段代码，就是说，执行一个函数，棒。
        g.registerAction('a', () => {
            paddle.moveLeft()
        })
        g.registerAction('d', () => {
            paddle.moveRight()
        })
        g.registerAction('w', () => {
            paddle.moveUp()
        })
        g.registerAction('s', () => {
            paddle.moveDown()
        })

        enableDebugMode(true, g)
    }



    update() {
        ball.move()

        if (ball.hit(paddle)) {
            ball.bounceOff(paddle)
        }

        for (let i = 0; i < bricks.length; i++) {
            let brick = bricks[i];
            if (brick.alive && ball.hit(brick)) {
                brick.hit()
                window.score += 100
                ball.bounceOff(brick)
            }
        }

        // 这个地方就是游戏的死亡判断
        if (ball.y + ball.h > this.game.canvas.height) {
            var scene_game_over = Scene_game_over.new(this.game)
            this.game.setScene(scene_game_over)
        }
    }

    draw() {
        var game = this.game
        game.showScore()

        // 这个是总的画图函数，具体的画图函数，画什么，怎么画，怎么限制图像的位置，应该做成接口，然后在这里调用
        // 比如，这里只把要画的对象，传给 game.drawImage 这个画一个东西的具体的实现
        // 限制画出来的东西在画布的范围里面的函数 clamp，在 game.drawImage 里面调用了
        game.drawImage(paddle)
        game.drawImage(ball)
        for (let i = 0; i < bricks.length; i++) {
            let brick = bricks[i];
            if (brick.alive) {
                game.drawImage(brick)
            }
        }

        // 放在这是为了让 Paused 这几个字母，挡住其他的东西，砖啊什么的
        if (!ball.fired) {
            game.context.fillText('Paused', 180, 140)
        }
    }
}

