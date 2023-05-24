const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.get('/supplier', async (req, res) => {
  const supplier = await prisma.Mst_supplier.findMany()
  res.json(supplier)
})

// Get By:id
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

// Create
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

// Update
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
  

// Delete
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

module.exports = router;
