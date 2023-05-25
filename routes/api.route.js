const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

// ----------- Supplier -----------
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

// ----------- Rack -----------
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

// ----------- Part -----------
//get all part
router.get('/part', async (req, res, next) => {
  try {
      const mst_parts = await prisma.Mst_part.findMany({
      include: {mst_racks: true}
      })
  
      const mst_racks = await prisma.Mst_rack.findMany({
      include:{mst_parts: true}
      
      })

      res.json({mst_parts, mst_racks})
  } catch (error) {
      next(error)
  }
  });

//get part by id
router.get('/part/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const part = await prisma.Mst_part.findUnique({
      where:{
        part_no: Number(id)
      },
      include: {mst_racks:true}
    })
    res.json(part)
  } catch (error) {
    next(error)
  }
});

//create part
router.post('/part', async (req, res, next) => {
  try {
      const part = await prisma.Mst_part.create({
      data : req.body
      })
  
      res.json({part})
  } catch (error) {
      next(error)
  }
  });

//update part by id
router.patch('/part/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const part = await prisma.Mst_part.update({
      data: req.body,
      where:{
        part_no: Number(id)
      },
      include: {mst_racks:true}
    })
    res.json(part)
  } catch (error) {
    next(error)
  }
}); 

//delete part by id
router.delete('/part/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const part = await prisma.Mst_part.delete({
      where:{
        part_no: Number(id)
      }
    })
    res.json(part)
  } catch (error) {
    next(error)
  }
});

// ----------- Work Order -----------
//get all tb_wo
router.get('/wo', async (req, res, next) => {
  try {
    const tb_wos = await prisma.tb_wo.findMany({
      include: {
        mst_parts: true,
        mst_suppliers: true,
      },
    });
  
      const mst_parts = await prisma.Mst_part.findMany({
      include:{tb_wo: true}
      })

      const mst_suppliers = await prisma.Mst_supplier.findMany({
      include:{tb_wos: true}
      })

      res.json({tb_wos, mst_parts, mst_suppliers})
  } catch (error) {
      next(error)
  }
  });

//get tb_wo by id
router.get('/wo/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const wo = await prisma.Tb_wo.findUnique({
      where:{
        id_wo: Number(id)
      },
      include: {
        mst_parts: true,
        mst_suppliers: true,
      }
    })
    res.json(wo)
  } catch (error) {
    next(error)
  }
});

//create wo
router.post('/wo', async (req, res, next) => {
  try {
      const wo = await prisma.Tb_wo.create({
      data : req.body
      })
  
      res.json({wo})
  } catch (error) {
      next(error)
  }
  });

//update wo by id
router.patch('/wo/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const wo = await prisma.Tb_wo.update({
      data: req.body,
      where:{
        id_wo: Number(id)
      },
      include: {
        mst_parts: true,
        mst_suppliers: true,
      }
    })
    res.json(wo)
  } catch (error) {
    next(error)
  }
}); 

//delete wo by id
router.delete('/wo/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const wo = await prisma.Tb_wo.delete({
      where:{
        id_wo: Number(id)
      }
    })
    res.json(wo)
  } catch (error) {
    next(error)
  }
});

// ----------- Delivery Order -----------
//get all tb_do
router.get('/do', async (req, res, next) => {
  try {
    const tb_dos = await prisma.Tb_do.findMany({
      include: {
        mst_parts: true,
        mst_suppliers: true,
      },
    });
  
      const mst_parts = await prisma.Mst_part.findMany({
      include:{tb_do: true}
      })

      const mst_suppliers = await prisma.Mst_supplier.findMany({
      include:{tb_dos: true}
      })

      res.json({tb_dos, mst_parts, mst_suppliers})
  } catch (error) {
      next(error)
  }
  });

//get tb_do by id
router.get('/do/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const tb_dos = await prisma.Tb_do.findUnique({
      where:{
        id_do: Number(id)
      },
      include: {
        mst_parts: true,
        mst_suppliers: true,
      }
    })
    res.json(tb_dos)
  } catch (error) {
    next(error)
  }
});

//create do
router.post('/do', async (req, res, next) => {
  try {
      const dos = await prisma.Tb_do.create({
      data : req.body
      })
  
      res.json({dos})
  } catch (error) {
      next(error)
  }
  });

//update wo by id
router.patch('/do/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const tb_dos = await prisma.Tb_do.update({
      data: req.body,
      where:{
        id_do: Number(id)
      },
      include: {
        mst_parts: true,
        mst_suppliers: true,
      }
    })
    res.json(tb_dos)
  } catch (error) {
    next(error)
  }
}); 

//delete wo by id
router.delete('/do/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const tb_dos = await prisma.Tb_do.delete({
      where:{
        id_do: Number(id)
      }
    })
    res.json(tb_dos)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
