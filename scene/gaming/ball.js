// 用面向对象重构
class Ball {
    constructor(images) {
        var self = this
        self.img = images['ball']
        self.image = self.img,
        self.x = 140,
        self.y = 150,
        self.speedX = 3,
        self.speedY = 3,
        self.width = ballWidth,
        self.height = ballHeight,
        self.move = function() {
            if (self.x < 0 || self.x + self.width > canvasWidth) {
                self.speedX = - self.speedX
                
                log('Current direction of ball: ' + (self.speedX > 0 ? 'right' : 'left')  
                + ' ' + (self.speedY > 0 ? 'down' : 'up'))

            }
            if (self.y < 0 || self.y + self.height > canvasHeight) {
                self.speedY *= -1

                
                log('Current direction of ball: ' + (self.speedX > 0 ? 'right' : 'left')  
                + ' ' + (self.speedY > 0 ? 'down' : 'up'))
            }
                        
            self.x += self.speedX
            self.y += self.speedY
        }
        
        self.bounce = function() {
            self.speedY *= -1
            log('Current direction of ball: ' + (self.speedX > 0 ? 'right' : 'left')  
            + ' ' + (self.speedY > 0 ? 'down' : 'up'))
        }
    }
}
