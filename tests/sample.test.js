const supplierService = require("../service/supplier.service");
const doService = require("../service/do.service");
const woService = require("../service/wo.service");
const rackService = require("../service/rack.service");
const partService = require("../service/part.service");
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
const s$suppier = supplierService(db)
const s$rack = rackService(db)
const s$part = partService(db)
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

describe('Uji DB 4', ()=>{

        test('Test Rack - All', async ()=>{
            const req = {
                body:{
                    "rack_no": "A12"
                }
            }
    
            const addRack = await s$rack.addRack(req);
    
            expect(addRack.code).toBe(200)
    
            const deleteRack = await s$rack.deleteRack({
                params:{
                    id: addRack.data.rack.id_rack
                }
            })
    
            expect(deleteRack.code).toBe(200)
        })
    })

describe('Uji DB 5', ()=>{

        test('Test Part - All', async ()=>{
            const req = {
                body:{
                    "part_name": "A2",
                    "part_uniq": "A13",
                    "mst_rackId": 1
                }
            }
    
            const addPart = await s$part.addPart(req);
    
            expect(addPart.code).toBe(200)
    
            const deletePart = await s$part.deletePart({
                params:{
                    id: addPart.data.part.part_no
                }
            })
    
            expect(deletePart.code).toBe(200)
        })
    })