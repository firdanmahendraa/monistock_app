const supplierService = require("../service/supplier.service");
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
const s$suppier = supplierService(db)

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
