const express = require('express')
const config = require('./config')
const cors = require('cors')
const app = express()
const fileUpload = require('express-fileupload')

const userRouter = require('./routes/user.route')
const datasetRouter = require('./routes/dataset.route')

app.use(cors())
app.use(fileUpload())
app.use(express.json())

app.get('/api/', (req, res) => res.send('Hello World!'))

app.use('/api/user', userRouter)
app.use('/api/dataset', datasetRouter)




app.listen(config.port, () => console.log(`Listening on ${ config.port }`))
