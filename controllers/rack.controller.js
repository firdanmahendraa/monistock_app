const {Router} = require('express')
const rackService = require('./../service/rack.service')
const utils = require('./../utils/response')
const rackController = (db)=>{

  const s$rack = rackService(db)
  RackController = Router();

  // Endpoint for get all products
  RackController.get('/', async (req, res, next) => {
    const data = await s$rack.getRack(req)
    utils.sendResponse(res, data)
  });

// Endpoint for get products by id
  RackController.get('/:id', async (req, res, next) => {
    const data = await s$rack.getRackById(req)
    utils.sendResponse(res, data)
  });

// Endpoint for create new products
  RackController.post('/', async (req, res, next) => {
    const data = await s$rack.addRack(req)
    utils.sendResponse(res, data)
  });

// Endpoint for delete products by id
  RackController.delete('/:id', async (req, res, next) => {
    const data = await s$rack.deleteRack(req)
    utils.sendResponse(res, data)
  });

// Endpoint for update products by id
  RackController.patch('/:id', async (req, res, next) => {
    const data = await s$rack.updateRack(req)
    utils.sendResponse(res, data)
  });

  return RackController;
}

module.exports = rackController;
