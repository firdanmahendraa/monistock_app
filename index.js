
//const { PrismaClient } = require('@prisma/client')
const express = require('express')
const cors = require('cors')
const routes = require('./routes')

//const prisma = new PrismaClient()
const app = express()
const port = 8000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', async (req, res) => {
    res.send({
        message: 'Hello this is API from Express Tutorial'
    })
})

routes(app)

app.get('/supplier', async (req, res) => {
    const supplier = await prisma.mst_supplier.findMany()
    res.json(supplier)
})


app.listen(port, () => {
    console.log('Server is running on http:localhost:${port}')
})

