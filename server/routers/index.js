const express = require('express')
const router = express.Router()
const timeAgo = require('./timeAgo')

router.get('/user/:id', function (req, res) {
  res.send('OK 233')
})

router.get('/', function (req, res) {
  res.render('index', { title: 'index', bundle: 'index'})
})

router.get('/login', function (req, res) {
  res.render('login', { title: 'login', bundle: 'login'})
})

router.get('/entry/:id', function (req, res) {
    if (!req.params.id) return res.send('233')
    let original = req.query.origin || false
    const query = new AV.Query('Entry')
    query.include('screenshot')
    query.include('user')
    query.get(req.params.id)
        .then(entry => {
            if (!entry) return Promise.reject()
            res.render('entry', { entry: entry, original: original, timeAgo: timeAgo(entry.get('createdAt')) })
        })
        .catch(err => {
            console.log('Error at entry')
            res.send('233')
        })
    
})

router.get('/post/:id', function (req, res) {
    if (!req.params.id) return res.send('233')
    let original = req.query.origin || false
    const query = new AV.Query('Post')
    query.include('entry')
    query.include('entry.user')
    query.include('entry.screenshot')
    query.get(req.params.id)
        .then(post => {
            if (!post) return Promise.reject()
            res.render('entry', { entry: post.get('entry'), original: original, timeAgo: timeAgo(post.get('createdAt')) })
        })
        .catch(err => {
            console.log('Error at entry')
            res.send('233')
        })
    
})

module.exports = router