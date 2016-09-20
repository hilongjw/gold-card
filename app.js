const express = require('express')
const path = require('path')
const http = require('http')
const compression = require('compression')

const NODE_ENV = process.env.NODE_ENV || 'production'
const SERVER_CONFIG = require('./config/index').SERVER_CONFIG[NODE_ENV]
const PORT = SERVER_CONFIG.PORT
const isDev = NODE_ENV === 'development';
const app = express()
const router = require('./server/routers/index')

global.AV = require('./config/index').AV

app.set('views', path.join(__dirname, 'server/views'))
app.set('view engine', 'ejs')
app.use(compression())
app.use(router)

if (isDev) {
    // local variables for all views
    app.locals.env = NODE_ENV;
    app.locals.reload = true;
    
    // static assets served by webpack-dev-middleware & webpack-hot-middleware for development
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackDevConfig = require('./build/webpack.config.js')

    const compiler = webpack(webpackDevConfig)

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }))

    app.use(webpackHotMiddleware(compiler))

    const server = http.createServer(app)

    app.use(express.static(path.join(__dirname, 'public')))

    server.listen(PORT, function(){
        console.log('App (dev) is now running on PORT '+ PORT +'!')
    })
} else {
    // static assets served by express.static() for production
    app.use(express.static(path.join(__dirname, 'public')))
    
    app.listen(PORT, function () {
        console.log('App (production) is now running on PORT '+ PORT +'!')
    })
}
