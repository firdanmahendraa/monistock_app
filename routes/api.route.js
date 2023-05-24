const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

// Get semua isi tabel supplier
router.get('/supplier', async (req, res) => {
  const supplier = await prisma.Mst_supplier.findMany()
  res.json(supplier)
})

// Get By:id supplier
router.get('/supplier/:id', async (req, res, next) => {
  try {
      const {id} = req.params
      const supplier = await prisma.Mst_supplier.findUnique({
      where:{
          id_supplier: Number(id)
      }
      })
      res.json(supplier)
  } catch (error) {
      next(error)
  }
  });

// Create supplier
router.post('/supplier', async (req, res, next) => {
  try {
    const supplier = await prisma.Mst_supplier.create({
      data : req.body
    })

    res.json({supplier})
  } catch (error) {
    next(error)
  }
});

// Update supplier
router.patch('/supplier/:id', async (req, res, next) => {
  try {
      const {id} = req.params
      const supplier = await prisma.Mst_supplier.update({
      data: req.body,
      where:{
          id_supplier: Number(id)
      }
      })
      res.json(supplier)
  } catch (error) {
      next(error)
  }
  });
  

// Delete supplier
router.delete('/supplier/:id', async (req, res, next) => {
  try {
      const {id} = req.params
      const product = await prisma.Mst_supplier.delete({
      where:{
          id_supplier: Number(id)
      }
      })
      res.json(product)
  } catch (error) {
      next(error)
  }
  }); 

  // Get semua rack
router.get('/rack', async (req, res) => {
  const rack = await prisma.Mst_rack.findMany()
  res.json(rack)
})

// Get By:id rack
router.get('/rack/:id', async (req, res, next) => {
  try {
      const {id} = req.params
      const rack = await prisma.Mst_rack.findUnique({
      where:{
          id_rack: Number(id)
      }
      })
      res.json(rack)
  } catch (error) {
      next(error)
  }
  });

  // Create rack
router.post('/rack', async (req, res, next) => {
  try {
    const rack = await prisma.Mst_rack.create({
      data : req.body
    })

    res.json({rack})
  } catch (error) {
    next(error)
  }
});

// Update rack
router.patch('/rack/:id', async (req, res, next) => {
  try {
      const {id} = req.params
      const rack = await prisma.Mst_rack.update({
      data: req.body,
      where:{
          id_rack: Number(id)
      }
      })
      res.json(rack)
  } catch (error) {
      next(error)
  }
  });
  

// Delete rack
router.delete('/rack/:id', async (req, res, next) => {
  try {
      const {id} = req.params
      const rack = await prisma.Mst_rack.delete({
      where:{
          id_rack: Number(id)
      }
      })
      res.json(rack)
  } catch (error) {
      next(error)
  }
  });


module.exports = router;
