const Game = (images, __init) => {
    const canvas = el('#id-canvas')
    const context = canvas.getContext('2d')

    const g = {}

    g.canvas = canvas
    g.context = context

    g.debugMode = false
    g.paused = false
    g.score = 0
    g.fps = 50
    g.scene = {}

    g.images = {}
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
    g.registerAction = (key, action) => {
        g.actions[key] = action
    }

    g.enableDebugMode = (isEnabled) => {
        if (!isEnabled) {
            return
        }
        g.debugMode = true

        const fpsInput = el('#id-input-fps')
        const fpsText = el('#id-text-fps')
        // const logText = el('#id-text-log')

        // log = function() {
        //     let line = ''
        //     for (const arg of arguments) {
        //         line += arg
        //     }
        //     logText.innerText = `${line}\n${logText.value}`
        // }

        fpsInput.removeAttribute('hidden')
        // logText.removeAttribute('hidden')

        fpsInput.addEventListener('input', (event) => {
            const fps = event.target.value
            g.fps = Number(fps)
            fpsText.innerText = fps
        })

        // 暂停 和 加载关卡 是按下就触发，不需要一直触发，所以不是用注册的办法注册进来，为了方便省事直接 hard code 在这
        window.addEventListener('keydown', (event) => {
            const k = event.key
            if (k === 'p') {
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
            const b = Brick(g, pos[0], pos[1])
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

    g.createElement = (nameOfImage, x, y) => {
        const ele = {}

        ele.image = g.images[nameOfImage]
        ele.x = x
        ele.y = y
        ele.w = ele.image.width
        ele.h = ele.image.height

        return ele
    }

    // 画一个游戏元素的时候
    // 参数 ele 的形状：
    // {
    //     image: 可以是一个 HTML <img> 元素,
    //     x: 100,
    //     y: 200,
    // }
    g.drawElement = (ele) => {
        g.context.drawImage(ele.image, ele.x, ele.y)
    }

    g.drawText = (text, x, y) => {
        g.context.fillText(text, x, y)
    }

    g.drawScore = () => {
        g.drawText(`Score: ${g.score}`, 20, 290)
    }

    g.addScore = (addend) => {
        g.score += addend
    }

    g.loads = () => {
        for (let name in images) {
            const path = images[name]
            const image = imageFromPath(path)
            image.onload = () => {
                g.images[name] = image
                if (Object.keys(g.images).length === Object.keys(images).length) {
                    g.__start()
                }
            }
        }
    }

    g.setFont = (style) => {
        g.context.font = style
    }

    // 用场景的 update 和 draw，加一层抽象增加灵活性
    g.update = () => {
        g.scene.update()
     }
    g.draw = () => {
        g.scene.draw()
    }

    g.setScene = (scene) => {
        g.scene = scene
    }

    // 游戏的主要逻辑都在这里
    g.runloop = () => {
        if (!g.paused) {
            // 触发当前被触发的交互事件
            g.events()

            // 更新游戏的状态，比如让球动起来啊，之类的事情
            g.update()
        }

        // 清空画布
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)

        // 把要画的东西都画出来
        g.draw()

        window.setTimeout(() => {
            g.runloop()
        }, 1000 / g.fps)
    }

    g.__start = () => {
        __init(g)

        g.runloop()
    }

    return g
}
