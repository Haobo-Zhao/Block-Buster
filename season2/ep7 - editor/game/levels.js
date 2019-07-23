// setting global levels
const defaultLevels = [
    [
        [0, 0,],
    ],
    [
        [100, 150,],
        [150, 150,],
    ],
    [
        [50, 150,],
        [100, 150,],
        [150, 150,],
        [200, 150,],
    ],
]

const localLevels = JSON.parse(window.localStorage.getItem('levels'))
if (!localLevels) {
    window.localStorage.setItem('levels', JSON.stringify(defaultLevels))
}

window.levels = localLevels || defaultLevels
