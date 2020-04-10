const express = require('express')
const helmet = require('helmet')

const server = express()

server.use(express.json())
server.use(helmet())

const projectRouter = require('./api/projectsRouter')

server.use('/api/projects', projectRouter)

server.get('/actions')

module.exports = server