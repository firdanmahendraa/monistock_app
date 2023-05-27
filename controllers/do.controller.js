const {Router} = require('express')
const doService = require('../service/do.service')
const utils = require('../utils/response')
const doController = (db)=>{

  const s$do = doService(db)
  DoController = Router();


  // Endpoint for get all products
  DoController.get('/', async (req, res, next) => {
    const data = await s$do.getDo(req)
    utils.sendResponse(res, data)
  });

// Endpoint for get products by id
  DoController.get('/:id', async (req, res, next) => {
    const data = await s$do.getDoById(req)
    utils.sendResponse(res, data)
  });

// Endpoint for create new products
  DoController.post('/', async (req, res, next) => {
    const data = await s$do.addDo(req)
    utils.sendResponse(res, data)
  });

// Endpoint for delete products by id
  DoController.delete('/:id', async (req, res, next) => {
    const data = await s$do.deleteDo(req)
    utils.sendResponse(res, data)
  });

// Endpoint for update products by id
  DoController.patch('/:id', async (req, res, next) => {
    const data = await s$do.updateDo(req)
    utils.sendResponse(res, data)
  });

  return DoController;
}

module.exports = doController;
