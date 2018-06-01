// 用面向对象来重构
class scene_gaming {
    constructor(game) {
        var self = this

        self.game = game
        self.paddle = Paddle(game.images)
        self.ball = new Ball(game.images)
        self.bricks = loadLevel(game.images, 1)

        self.fpsRange = document.getElementById("id-fps")
        self.fpsRange.oninput = function() {
            window.fps = Number(fpsRange.value)
            fpsShow.innerHTML = "&nbsp&nbspfps: " + window.fps
        }

        self.fpsShow = document.getElementById('id-span')
        self.fpsShow.innerHTML = "&nbsp&nbsp fps: " + window.fps

        self.score = document.getElementById("id-score")
        self.score.innerHTML = "分数: " + window.score

        self.textarea = document.getElementById("id-textarea")

        self.game.registerAction('a', function() {
            self.paddle.moveLeft()
        })

        self.game.registerAction('d', function() {
            self.paddle.moveRight()
        })

        // 暂时不需要上下移动的功能
        // self.game.registerAction('w', function() {
            // paddle.moveUp()
        // })

        // self.game.registerAction('s', function() {
            // paddle.moveDown()
        // })

        // 如果这个时间触发，就动球，否则就不动球。
        // 相当于用这个时间检测一个pause的功能
        self.game.registerAction(' ', function() {
            self.ball.move()
        })

        // 判断按下的是不是数字的一个巧招
        window.addEventListener('keydown', function(event) {
            if ('123456789'.includes(event.key)) {
                self.bricks = loadLevel(self.game.images, Number(event.key))
            }
        })

        // 三个函数联合起来，实现球的拖拽的功能
        window.addEventListener('mousedown', function(event) {
            // 在球的区域里面才能够拖这个球
            if (event.offsetX >= self.ball.x && event.offsetX <= self.ball.x + self.ball.width) {
                if (event.offsetY >= self.ball.y && event.offsetY <= self.ball.y + self.ball.height) {
                    self.game.moving = true
                    self.initialX = event.offsetX
                    self.initialY = event.offsetY
                }
            }
        })
        // 在暂停的情况下才允许移动球，当然也可以可以随便改
        window.addEventListener('mousemove', function(event) {
            // 有空格事件的时候，是球能够动的状态
            // 动的时候不能拖动球
            if ((self.game.moving == true) && (self.game.keydowns[' '] != true)) {
                self.currentX = event.offsetX
                self.currentY = event.offsetY
                self.ball.x += self.currentX - self.initialX
                self.ball.y += self.currentY - self.initialY
                // 注意，如果用笨办法，就是算位移，
                // 移动一次球之后，要把原点重新定位到这个位置来，方便下一次移动计算位移
                self.initialX = self.currentX
                self.initialY = self.currentY
            }
        })
        //鼠标不再点了，抬起来了，就不再移动球了
        window.addEventListener('mouseup', function(event) {
            self.game.moving = false
        })
        

        self.collide = function() {
            // 判断球和板子是不是相碰了
            // 上下相碰，先不考虑左右两边,只改变球的Y方向的速度speedY
            // 球严格在挡板两端的长度以内
            if ((self.ball.x + self.ball.width > self.paddle.x && self.ball.x < self.paddle.x + self.paddle.width)
                && (self.ball.y + self.ball.height > self.paddle.y && self.ball.y < self.paddle.y + self.paddle.height)) {
                self.ball.speedY *= -1
                log('Current direction of ball: ' + (self.ball.speedX > 0 ? 'right' : 'left')  
                + ' ' + (self.ball.speedY > 0 ? 'down' : 'up'))
            }

            // 球和砖块碰撞没有
            for (let i = 0; i < self.bricks.length; i++) {
                var b = self.bricks[i]
                b.collide(self.ball)
            }
        }

        // 定义draw的含义，在setTimeout里面会不停地调用这个重新定义过的函数
        self.draw = function() {
            
            if (game.keydowns[' '] == false) {
                game.context.font = "50px Arial"
                game.context.fillText("Paused",canvasWidth / 2, canvasHeight / 2)
            }
            
            // 如果球的下端面碰到下面的屏幕，游戏就结束
            if (self.ball.y + self.ball.height >= canvasHeight) {
                // 存一个状态，说游戏结束了
                window.gameover = true
                var gameover = scene_gameover.new(self.game)
                self.game.run_with_scene(gameover)
            }
            // 画挡板
            game.drawImage(self.paddle)

            // 画球
            game.drawImage(self.ball)
        
            // 画砖块
            for (let i = 0; i < self.bricks.length; i++) {
                var b = self.bricks[i]
                if (b.alive) {
                    game.drawImage(b)
                }
            }

            self.score.innerHTML = "分数: " + window.score
        }

        // 全部初始化清楚之后，输出一次球现在的运动方向
        // 把现在的球的移动方向写在textarea里面
        log('Current direction of ball: ' + (self.ball.speedX > 0 ? 'right' : 'left')  
        + ' ' + (self.ball.speedY > 0 ? 'down' : 'up'))
    }
}
