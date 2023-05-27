const {Router} = require('express')
const woService = require('./../service/wo.service')
const utils = require('./../utils/response')
const woController = (db)=>{

  const s$wo = woService(db)
  WoController = Router();


  // Endpoint for get all products
  WoController.get('/', async (req, res, next) => {
    const data = await s$wo.getWo(req)
    utils.sendResponse(res, data)
  });

// Endpoint for get products by id
  WoController.get('/:id', async (req, res, next) => {
    const data = await s$wo.getWoById(req)
    utils.sendResponse(res, data)
  });

// Endpoint for create new products
  WoController.post('/', async (req, res, next) => {
    const data = await s$wo.addWo(req)
    utils.sendResponse(res, data)
  });

// Endpoint for delete products by id
  WoController.delete('/:id', async (req, res, next) => {
    const data = await s$wo.deleteWo(req)
    utils.sendResponse(res, data)
  });

// Endpoint for update products by id
  WoController.patch('/:id', async (req, res, next) => {
    const data = await s$wo.updateWo(req)
    utils.sendResponse(res, data)
  });

  return WoController;
}

module.exports = woController;