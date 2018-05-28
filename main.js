var loadLevel = function(level) {
    var bricks = []
    // 正常选关从1开始
    // 但是数组的数据是从零开始
    var data = levels[level - 1]
    for (var i = 0; i < data.length; i++) {
        // 分别代表传入一个砖块的x值、y值和血量
        bricks.push(Brick(data[i]))
    }
    return bricks
}

var __main = function() {
    // 开始创建变量和设置游戏
    var game = Game()
    var paddle = Paddle()
    var ball = Ball()
    var bricks = loadLevel(1)

    var fpsRange = document.getElementById("id-fps")
    fpsRange.oninput = function() {
        window.fps = Number(fpsRange.value)
        fpsShow.innerHTML = "&nbsp&nbspfps: " + window.fps
    }

    var fpsShow = document.getElementById('id-span')
    fpsShow.innerHTML = "&nbsp&nbsp fps: " + window.fps

    var score = document.getElementById("id-score")
    score.innerHTML = "分数: " + window.score
    
    var textarea = document.getElementById("id-textarea")

    game.registerAction('a', function() {
        paddle.moveLeft()
    })

    game.registerAction('d', function() {
        paddle.moveRight()
    })

    game.registerAction('w', function() {
        paddle.moveUp()
    })

    game.registerAction('s', function() {
        paddle.moveDown()
    })

    game.registerAction(' ', function() {
        ball.move()
    })

    // 判断按下的是不是数字的一个巧招
    window.addEventListener('keydown', function(event) {
        if ('123456789'.includes(event.key)) {
            bricks = loadLevel(Number(event.key))
        }
    })

    // 这里不用考虑图片载入的问题
    // 没载入，同样画出来，只不过是一片空白，对画布没影响
    // 已经载入了，那就可以画了，就可以看到
    // game.draw = function() {
    //     game.context.clearRect(0, 0, game.canvas.width, game.canvas.height)
    //     game.context.drawImage(paddle.image, paddle.x, paddle.y)
    // }

    game.collide = function() {
        // 判断球和板子是不是相碰了
        // 上下相碰，先不考虑左右两边,只改变球的Y方向的速度speedY
        // 球严格在挡板两端的长度以内
        if ((ball.x + ball.image.width > paddle.x && ball.x < paddle.x + paddle.image.width)
         && (ball.y + ball.image.height > paddle.y && ball.y < paddle.y + paddle.image.height)) {
            ball.speedY *= -1
        }

        // 球和砖块碰撞没有
        for (var i = 0; i < bricks.length; i++) {
            var b = bricks[i]
            b.collide(ball)
        }
    }

    // 定义draw的含义，在setTimeout里面会不停地调用这个重新定义过的函数
    game.draw = function() {
        // 画挡板
        game.drawImage(paddle)

        // 画球
        game.drawImage(ball)
        
        // 画砖块
        for (var i = 0; i < bricks.length; i++) {
            var b = bricks[i]
            if (b.alive) {
                game.drawImage(b)
            }
        }

        if (game.keydowns[' '] == false) {
            game.context.font = "50px Arial"
            game.context.fillText("Paused",canvasWidth / 2, canvasHeight / 2);
        }

        score.innerHTML = "分数: " + window.score

        // log()
    }

    game.runLoop()
}
