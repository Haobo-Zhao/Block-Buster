const Game = () => {
    const canvas = el('#id-canvas')
    const context = canvas.getContext('2d')

    const g = {}
    g.canvas = canvas
    g.context = context
    g.paused = false
    g.keydowns = {}
    g.actions = {}

    // 循环有回调的 g.actions ，然后去看哪个键按下了，就调用对应的回调，
    // 而不是先看有哪些键按下来，因为有很多键可能会被按，但是我们只关心有回调的那些有没有被按下来
    g.events = () => {
        const keys = Object.keys(g.actions)
        for (let key of keys) {
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
    }

    // 注册事件机制的实现，给外面提供一个注册的接口
    g.registerAction = (key, callback) => {
        g.actions[key] = callback
    }

    g.enableDebugMode = (isEnabled) => {
        if (!isEnabled) {
            return
        }
        window.addEventListener('keydown', (event) => {
            const k = event.key
            if (k === 'Enter') {
                g.paused = !g.paused
            } else if (k !== ' ' && !isNaN(Number(k))) { // Numer(' ') is 0, so get rid of it
                let level = Number(k)
                // default level to 1 if assigned an inappropriate number
                if (level < 1 || level > window.levels.length) {
                    level = 1
                }
                window.bricks = g.loadLevel(level)
            }
        })
    }

    g.loadLevel = (level) => {
        level -= 1
        const bricks = []
        for (const pos of window.levels[level]) {
            const b = Brick(pos[0], pos[1])
            bricks.push(b)
        }
        return bricks
    }

    // 按键的交互逻辑
    window.addEventListener('keydown', (event) => {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', (event) => {
        g.keydowns[event.key] = false
    })

    // 画一个游戏元素的时候
    // 参数的形状：
    // {
    //     image: 可以是一个 HTML <img> 元素,
    //     x: 100,
    //     y: 200,
    // }
    g.drawElement = (ele) => {
        g.context.drawImage(ele.image, ele.x, ele.y)
    }

    g.drawElements = (eles) => {
        for (const ele of eles) {
            g.drawElement(ele)
        }
    }

    // 这两个逻辑会从外面注册进来，因为没有直接传进来要渲染的东西，所以还拿不到要画的东西
    g.update = () => { }
    g.draw = () => { }

    // 游戏的主要逻辑都在这里
    g.runloop = () => {
        if (!g.paused) {
            // 触发当前被触发的交互事件，现在只有按下键的事件
            g.events()

            // 更新游戏的状态，比如让球动起来啊，之类的事情
            g.update()

            // 清空画布
            g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)

            // 把要画的东西都画出来
            g.draw()
        }

        window.setTimeout(() => {
            g.runloop()
        }, 1000 / window.fps)
    }

    return g
}
