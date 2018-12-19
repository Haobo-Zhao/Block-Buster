var log = console.log.bind(console)

var imageFromPath = function (path) {
    var image = new Image()
    image.src = path
    return image
}
