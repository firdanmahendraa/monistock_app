const router = require('express').Router();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.get('/supplier', async (req, res) => {
  const supplier = await prisma.mst_supplier.findMany()
  res.json(supplier)
})

router.post('/supplier', async (req, res, next) => {
  try {
      const supplier = await prisma.mst_supplier.create({
      data : req.body
      })
  
      res.json({supplier})
  } catch (error) {
      next(error)
  }
  });

module.exports = router;
