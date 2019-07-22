class Scene {
    constructor(game) {
        this.game = game
    }

    static new(game) {
        return new this(game)
    }

    static instance(game) {
        this.i = this.i || new this(game)
        return this.i
    }

    // purposefully default update method to be empty
    update() {

    }
    // purposefully default draw method to be empty
    draw() {

    }
}
