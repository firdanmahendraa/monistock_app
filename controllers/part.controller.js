const {Router} = require('express')
const partService = require('./../service/part.service')
const utils = require('./../utils/response')
const partController = (db)=>{

  const s$part = partService(db)
  PartController = Router();

  // Endpoint for get all products
  PartController.get('/', async (req, res, next) => {
    const data = await s$part.getPart(req)
    utils.sendResponse(res, data)
  });

// Endpoint for get products by id
  PartController.get('/:id', async (req, res, next) => {
    const data = await s$part.getPartById(req)
    utils.sendResponse(res, data)
  });

// Endpoint for create new products
  PartController.post('/', async (req, res, next) => {
    const data = await s$part.addPart(req)
    utils.sendResponse(res, data)
  });

// Endpoint for delete products by id
  PartController.delete('/:id', async (req, res, next) => {
    const data = await s$part.deletePart(req)
    utils.sendResponse(res, data)
  });

// Endpoint for update products by id
  PartController.patch('/:id', async (req, res, next) => {
    const data = await s$part.updatePart(req)
    utils.sendResponse(res, data)
  });

  return PartController;
}

module.exports = partController;
