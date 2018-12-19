class Game {
    // 还是希望做成单例的模式
    constructor(resources, callback) {
        // this.resources = {
        //     paddle: 'img/paddle.png',
        //     ball: 'img/ball.png',
        //     brick: 'img/brick.png',
        // }
        this.resources = resources

        // this.callback = (g) => {
        //     var scene = Scene_title.new(g)
        //     g.runWithScene(scene)
        // }
        // 这个 callback 会在 load 函数被调用之后，图片都加载好之后，被调用
        this.callback = callback

        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // bitmap， 如果用 css 来 设置 width 和 height 的话，是node的元素，不是 bitmap 的值，会出问题
        this.canvas.width = 400
        this.canvas.height = 300

        this.keydowns = {}
        this.actions = {}

        // 先把 scene 定义出来，然后在把scene传进来的时候绑定上
        this.scene = {}

        window.fps = 60

        this.init()

        // 不加的话，在第二次运行 updateAndDraw 的时候，updateAndDraw 函数里面的 this 就指向 window 了，会报错
        this.updateAndDraw = this.updateAndDraw.bind(this)
    }

    // 单例模式
    // static new(resources, callback) {
    // 用一下 rest 和 expand 运算符，算是锻炼一下高级的 JS 编程技巧
    static instance(...args) {
        this.i = this.i || (new this(...args))
        return this.i
    }

    init() {
        // 有陷阱，如果不用箭头函数，那么箭头函数里面的 this 在调用的时候会指向 window，到时候就会报错

        // 有方向键被按下
        window.addEventListener('keydown', (event) => {
            this.keydowns[event.key] = true
        })

        // 方向键松开
        window.addEventListener('keyup', (event) => {
            this.keydowns[event.key] = false
        })
    }

    run() {
        this.load()
    }

    load() {
        var namesOfResources = Object.keys(this.resources)
        var loaded = 0;
        this.images = {}
        for (var i = 0; i < namesOfResources.length; i++) {
            // 这里没用 let 我也做好了，值得细细去品味
            var name = namesOfResources[i]
            var imageElement = imageFromPath(this.resources[name])
            this.images[name] = imageElement
            // 如果一个 image 的 src 属性改变之后，它的 onload 事件会被重新触发，要留意
            this.images[name].onload = () => {
                loaded++
                if (loaded === namesOfResources.length) {
                    this.callback(this)
                }
            }
        }
    }

    // 画图的函数
    drawImage(element) {
        var game = this
        game.clamp(element)
        game.context.drawImage(element.image, element.x, element.y)
    }


    // 限制画出来的东西在画布的范围里面
    clamp(element) {
        var game = this
        if (element.x < 0 || element.x + element.image.width > game.canvas.width) {
            element.x = element.x < 0 ? 0 : (game.canvas.width - element.image.width)
        }
        if (element.y < 0 || element.y + element.image.height > game.canvas.height) {
            element.y = element.y < 0 ? 0 : (game.canvas.height - element.image.height)
        }
    }

    // 允许从函数外面来注册事件，注册的事件在 update 的时候被自动调用，
    // 其实主要就是控制按下键了，挡板怎么动
    registerAction(key, callback) {
        this.actions[key] = callback
    }


    // 下面这两个函数，在现在这个时候，也就是定义的时候，
    // 虽然 scene.update 函数还不存在，不过不要紧
    // 只要在跑的时候有，就可以了
    // 怎么保证跑的时候有呢？ 
    // 就是在绑定了 scene 到 game.scene 里面之后，再去跑那些，调用了 update 这个函数的，那些函数
    // game.draw 也是一样的道理
    update() {
        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    showScore() {
        this.context.font = '20px consolas'
        this.context.fillText('Score: ' + score, 10, 290)
    }

    // 这个函数就有意思了，可以说是整个程序最难写的一个函数
    // 递归的思想，就是在这个函数里面，先做基本的事情，update啊，画图啊，之类的
    // 然后，再函数的末尾，快要跑出函数体的时候，叫机器在一定的时间间隔之后，调用这个函数自身，
    // 好好去品一品这个递归的函数的写法，你会着迷的 :-)
    // 想象成一片代码跑完之后，定个时，安排电脑多久之后，跑下一片代码
    // 有一个箭头，通过弯弯曲曲的线指向下一片代码，巧的是，下一片的代码，是和刚刚跑的那一片，一模一样，
    // 所以又做同样的事情啦
    updateAndDraw() {
        // 执行当前事件数组 actions 里面，被按下键对应的事件
        for (var key in this.actions) {
            if (this.keydowns[key]) {
                this.actions[key]()
            }
        }

        // update 整个游戏的一些状态，比如说挡板的位置，球的位置，等等东西，具体做什么，在外面定义，从外面传进来
        // 有这个函数才调用
        this.update && this.update()

        // 先清空画布，然后再画新的，更新了状态之后的画面
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // 调用画画的函数，把拥有了新的状态的画面画出来，但是具体做的事情从函数外面来决定，这样就有更好的灵活性
        // 有这个函数才调用
        this.update && this.draw()

        // 把 Game 转换成对象之后，这里有一个惊天巨坑，
        // 就是在调用回调的时候， 
        // 在 updateAndDraw 第一次被调用的时候，updateAndDraw 里面的 this 还是指向这个新创建的 game 对象的
        // 因为是被 game.runWithScene(scene)里面用 this.updateAndDraw 来调用的
        // 一切都还很好
        // 但是在 updateAndDraw 第二次被调用的时候，
        // 也就是，在第一次的 updateAndDraw 调用末尾的时候，setTimeout 里面的 this.updateAndDraw 出问题了
        // this 变成了 window，然后调用 window.updateAndDraw的话，就会报错了
        // 所以在构造函数里面，就把这个函数的 this，绑定到这个对象本身来
        // 起作用的，就是 this.updateAndDraw = this.updateAndDraw.bind(this) 这行代码

        // 这个是绑定 this.updateAndDraw = this.updateAndDraw.bind(this) 的做法
        // 用类似于连环的思路
        // 回调最好都写成函数表达式的形式
        // 如果 this.updateAndDraw 包在一个函数表达式里面，就会在第二次跑的时候报错，
        // window.setTimeout(function() {
        //     this.updateAndDraw    
        // }, 1000 / window.fps)
        // 因为在表达式 function(){}的里面，在函数表达式被执行的时候，this 已经指向 window 了
        window.setTimeout(this.updateAndDraw, 1000 / window.fps)

        // 如果不绑定的话，也可以做到，因为第一次能够拿到 game 自身，以后也一直能够拿到
        // 相当于，在第一次的时候，接住 this，在开始的时候, self = this，调用就用 self.updateAndDraw
        // 包不包在 function() {} 表达式里面问题都不大，但是最好是包起来
        // 然后就能一直往后传
        // 如果不想绑定 this.updateAndDraw = this.updateAndDraw.bind(this)，
        // 具体思路是，这个函数的结尾换成下面的代码，或者在开头的时候 self = this，然后所有 this 都换掉
        // 因为第一次跑这个函数的时候， this 的指向是对的，因为是在 game.runWithScene 函数里面被调用
        // 在一开始就 self = this，可以不用想这个，一环扣一环，减轻一点心智压力
        // var self = this
        // window.setTimeout(function() {
        //     self.updateAndDraw()
        // }, 1000 / window.fps)
    }

    // 从一个场景开始跑整个程序，正常是从 scene_title 开始跑
    runWithScene(scene) {
        this.setScene(scene)
        this.updateAndDraw()
    }

    setScene(scene) {
        this.scene = scene
    }
}
