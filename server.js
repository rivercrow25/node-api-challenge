const express = require('express')
const helmet = require('helmet')

const server = express()

server.use(express.json())
server.use(helmet())

const projectRouter = require('./api/projectsRouter')
const actionsRouter = require('./api/actionsRouter')

server.use('/api/projects', projectRouter)

server.use('/api/actions', actionsRouter)

module.exports = server