const validator = require('validator')

const isValidUrl = (value) => {
    if (!value) return true

    return validator.isURL(value, {
        protocols: ['http', 'https'],
        require_protocol: true
    })
}

module.exports = {
    isValidUrl
}