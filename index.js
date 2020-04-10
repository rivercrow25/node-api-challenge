//never sing to me again

const server = require('./server')

const port = process.env.Port || 5000

server.listen(port, () => console.log(`server listening on http://localhost:${port}`))