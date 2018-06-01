var Paddle = function(images) {
    //最后这个逗号一定要加，consistency非常重要
    //JSON这个数据格式最后强制要求不加，是一个很严重的设计错误
    var img = images['paddle']
    var o = {
        image: img,
        x: 105,
        y: 210,
        speed: 10,
        width: paddleWidth,
        height: paddleHeight,
        moveLeft: function() {
            this.x -= this.speed
            // 改变状态之后，做一个判断，看值是不是还是合理，不合理的话，调到一个合理的值
            if (this.x < 0) {
                this.x = 0
            }
        },

        moveRight: function() {
            this.x += this.speed
            if (this.x + this.image.width > canvasWidth) {
                this.x = canvasWidth - this.image.width
            }
        },

        moveUp: function() {
            this.y -= this.speed
            // 改变状态之后，做一个判断，看值是不是还是合理，不合理的话，调到一个合理的值
            if (this.y < 0) {
                this.y = 0
            }
        },

        moveDown: function() {
            this.y += this.speed
            if (this.y + this.image.height > canvasHeight) {
                this.y = canvasHeight - this.image.height
            }
        },

    }
    return o
}
