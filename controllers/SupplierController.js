const { Router } = require('express')
const m$supplier = require('../modules/sup.module')
const response = require('../helpers/response')

const SupplierController = Router()

SupplierController.get('/', async (req, res) => {
    const list = await m$supplier.listSup()

    response.sendResponse(res, list)
})

module.exports = SupplierController