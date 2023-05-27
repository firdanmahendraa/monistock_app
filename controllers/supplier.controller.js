const {Router} = require('express')
const supplierService = require('./../service/supplier.service')
const utils = require('./../utils/response')
const supplierController = (db)=>{

  const s$supplier = supplierService(db)
  SupplierController = Router();


  // Endpoint for get all products
  SupplierController.get('/', async (req, res, next) => {
    const data = await s$supplier.getSupplier(req)
    utils.sendResponse(res, data)
  });

// Endpoint for get products by id
  SupplierController.get('/:id', async (req, res, next) => {
    const data = await s$supplier.getSupplierById(req)
    utils.sendResponse(res, data)
  });

// Endpoint for create new products
  SupplierController.post('/', async (req, res, next) => {
    const data = await s$supplier.addSupplier(req)
    utils.sendResponse(res, data)
  });

// Endpoint for delete products by id
  SupplierController.delete('/:id', async (req, res, next) => {
    const data = await s$supplier.deleteSupplier(req)
    utils.sendResponse(res, data)
  });

// Endpoint for update products by id
  SupplierController.patch('/:id', async (req, res, next) => {
    const data = await s$supplier.updateSupplier(req)
    utils.sendResponse(res, data)
  });

  return SupplierController;
}

module.exports = supplierController;
