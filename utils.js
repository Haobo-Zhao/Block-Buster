// var e = sel => document.querySelector(sel)

// var log = function() {
//     e('#id-textarea').value += '\n' + 'something'
// }

var collide = function(a, b) {
    return (a.x + a.width > b.x && a.x < b.x + b.width) && (a.y + a.height > b.y && a.y < b.y + b.height)
}

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}
