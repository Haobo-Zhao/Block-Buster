// 相当于每一个具体场景的父类，面向对象，为了复用的目的
class Scene {
    constructor(game) {
        this.game = game
    }

    update() {

    }

    draw() {
        
    }

    // 不用 new 关键字来生成对象
    // 单例，场景都是一个，场景里面的动作是不变的，所以不需要运行那些addEventListener好几次
    // 变的只是里面的数据，所以如果有数据，就在个场景的生成函数里面，刷新数据
    // 如果没有需要刷新的数据，那就可以直接原样继承这个函数
    static new(game) {
        if (this.instance) {
            return this.instance
        }
        var i = new this(game)
        this.instance = i
        return i

        // 或者也可以这么写
        // this.instance = this.instance || new this(new)
        // return this.instance
    }
}