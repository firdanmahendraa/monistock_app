const supplierService = require("../service/supplier.service");
const doService = require("../service/do.service");
const woService = require("../service/wo.service");
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
const s$suppier = supplierService(db)
const s$dos = doService(db)
const s$wos = woService(db)

describe('Sample Test', function () {
    it('true',()=>{
        expect(true).toBe(true)
    })
});


describe('Uji DB', ()=>{

    test('Test Supplier - All', async ()=>{
        const req = {
            body:{
                "name_supplier": "Firdan ",
                "address_supplier": "Lumajang",
                "phone_supplier": "09123"
            }
        }

        const addSupplier = await s$suppier.addSupplier(req);

        expect(addSupplier.code).toBe(200)

        const deleteSup = await s$suppier.deleteSupplier({
            params:{
                id: addSupplier.data.supplier.id_supplier
            }
        })

        expect(deleteSup.code).toBe(200)
    })
})

describe('Uji DB 2', ()=>{
    test('Test Product - All', async ()=>{
        const req = {
            body:{
                "qty_kbn": 1,
                "qty_order": 2,
                "no_truck": "N1234b",
                "date_input": "2023-05-24T23:51:57.000Z",
                "mst_partId" : 1,
                "mst_supplierId" : 1
            }
        }

        const addDo = await s$dos.addDo(req);

        expect(addDo.code).toBe(200)

        const result = await s$dos.addDo(req);

        const deleteDo = await s$dos.deleteDo({
            params:{
                id: addDo.data.dos.id_do
            }
        })

        expect(deleteDo.code).toBe(200)
    })
})

describe('Uji DB 3', ()=>{
        test('Test Wo - All', async ()=>{
            const req = {
                body:{
                    "qty_kbn": 1,
                    "qty_order": 2,
                    "no_truck": "N1234b",
                    "date_input": "2023-05-24T23:51:57.000Z",
                    "mst_partId" : 1,
                    "mst_supplierId" : 1
                }
            }
    
            const addWo = await s$wos.addWo(req);
    
            expect(addWo.code).toBe(200)
    
            const result = await s$wos.addWo(req);
    
            // expect(result.status).toBe('Unique')
    
            const deleteWo = await s$wos.deleteWo({
                params:{
                    id: addWo.data.wos.id_wo
                }
            })
    
            expect(deleteWo.code).toBe(200)
        })
    })
