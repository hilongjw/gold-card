const AV = require('leancloud-storage')
const APP_ID = 'mhke0kuv33myn4t4ghuid4oq2hjj12li374hvcif202y5bm6'
const APP_KEY = 'mldfccqgjjmsk3xumif9j0qgls0vq6f2g7r3abouitfyboci'

const SERVER_CONFIG = {
    development: {
        ADDRESS: 'http://127.0.0.1',
        PORT: 8080
    },
    production: {
        ADDRESS: 'http://gold.bood.in',
        PORT: 80
    }
}

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})


module.exports.AV = AV
module.exports.SERVER_CONFIG = SERVER_CONFIG