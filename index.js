const express = require('express')

const app = module.exports = express()

const apiKeys = ['foo', 'bar', 'baz']

const repos = [
    { name: 'express', url: 'http://github.com/strongloop/express' }
  , { name: 'stylus', url: 'http://github.com/learnboost/stylus' }
  , { name: 'cluster', url: 'http://github.com/learnboost/cluster' }
];

const users = [
    { name: 'tobi' }
  , { name: 'loki' }
  , { name: 'jane' }
];

const userRepos = {
    tobi: [repos[0], repos[1]]
  , loki: [repos[1]]
  , jane: [repos[2]]
};

const error = (status, msg) => {
    const err = new Error(msg)
    err.status = status
    return err
}

app.use('/api', (req, res, next) => {
    const key = req.query['api-key']
    if (!key) return next(error(400, 'api key required'))
    if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'))
    req.key = key
    next()
})

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/api/users', (req, res, next) => {
    res.send(users)
})

app.get('/api/repos', (req, res, next) => {
    res.send(repos)
})

app.use((req, res) => {
    res.status(404).send({error: 'invalid route'})
})

if (!module.parent) {
    app.listen(3000)
    console.log('Express started on port 3000')
}