const utils = require('./../utils/response')
const debug = process.env.DEBUG

class _supplier{

    constructor(db) {
        this.db = db;
    }
    getSupplier = async (req)=>{
        try {
            const supplier = await this.db.mst_supplier.findMany()

            if (!supplier){
                return{
                    code: 404,
                    error: 'Sorry, Supplier Not Found'
                }
            }

            return{
                code: 200,
                status: true,
                data: supplier
            }
        } catch (error) {
            if (debug){
                console.error('Error Get Supplier', error)
            }
            return {
                code: 500,
                status: false,
                error
            }
        }
    }

    getSupplierById = async (req)=>{
        try {
            const {id} = req.params
            const supplier = await this.db.mst_supplier.findUnique({
                where:{
                    id_supplier: Number(id)
                }
            })

            if (!supplier){
                return{
                    code: 404,
                    error: 'Sorry, Supplier Not Found'
                }
            }
            return{
                code: 200,
                status: true,
                data: supplier
            }
        } catch (error) {
            if (debug){
                console.error('Error Get Supplier By Id', error)
            }
            return {
                code: 500,
                status: false,
                error
            }
        }
    }

    addSupplier = async (req)=>{
        try {
            const {name_supplier, address_supplier, phone_supplier} = req.body

            const supplier = await this.db.mst_supplier.create({
                data: {name_supplier, address_supplier, phone_supplier}
            })

            return{
                code: 200,
                data:{
                    supplier
                }
            }
        } catch (error) {
            return {
                code: 500,
                status: false,
                error
            }
        }
    }

    deleteSupplier = async (req)=>{
        try {
            const {id} = req.params
            const supplier = await this.db.mst_supplier.delete({
                where:{
                    id_supplier: Number(id)
                }
            })
            return{
                code: 200,
                data:{
                    supplier
                }
            }
        } catch (error) {
            return {
                code: 500,
                status: false,
                error
            }
        }
    }

    updateSupplier = async (req)=>{
        try {
            const {id} = req.params
            const supplier = await this.db.mst_supplier.update({
                data: req.body,
                where:{
                    id_supplier: Number(id)
                }
            })
            return{
                code: 200,
                data:{
                    supplier
                }
            }
        } catch (error) {
            return {
                code: 500,
                status: false,
                error
            }
        }
    }

}

module.exports = (db)=> new _supplier(db)
