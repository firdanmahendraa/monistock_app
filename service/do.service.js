const utils = require('../utils/response')
const debug = process.env.DEBUG

class _do{

    constructor(db) {
        this.db = db;
    }
    getDo = async (req)=>{
        try {
            const dos = await this.db.Tb_do.findMany({
                include: {
                    mst_parts: true,
                    mst_sup: true
                }
            })

            if (!dos){
                return{
                    code: 404,
                    error: 'Sorry, Do Not Found'
                }
            }

            return{
                code: 200,
                status: true,
                data: [dos]
            }
        } catch (error) {
            if (debug){
                console.error('Error Get Do', error)
            }
            return {
                code: 500,
                status: false,
                error
            }
        }
    }
    getParts = async (req)=>{
        try {
            const mst_parts = await this.db.mst_part.findMany({
                include:{dos: true}
            })

            return{
                code: 200,
                status: true,
                data: [mst_parts]
            }
        } catch (error) {
            if (debug){
                console.error('Error Get Do Part', error)
            }
            return {
                code: 500,
                status: false,
                error
            }
        }
    }
    getSupplier = async (req)=>{
        try {
            const mst_sup = await this.db.mst_supplier.findMany({
                include:{dos: true}
            })

            return{
                code: 200,
                status: true,
                data: [mst_sup]
            }
        } catch (error) {
            if (debug){
                console.error('Error Get Do Supplier', error)
            }
            return {
                code: 500,
                status: false,
                error
            }
        }
    }

    getDoById = async (req)=>{
        try {
            const {id} = req.params
            const dos = await this.db.mst_do.findUnique({
                where:{
                    id_do: Number(id)
                },
                include: {
                    mst_parts: true,
                    mst_supplier: true
                }
            })

            if (!dos){
                return{
                    code: 404
                }
            }
            return{
                code: 200,
                status: true,
                data: dos
            }
        } catch (error) {
            if (debug){
                console.error('Error Get Do By Id', error)
            }
            return {
                code: 500,
                status: false,
                error
            }
        }
    }

    addDo = async (req)=>{
        try {
            const {qty_kbn, qty_order, no_truck, date_input, mst_partId, mst_supplierId} = req.body

            const dos = await this.db.tb_do.create({
                data: {qty_kbn, qty_order, no_truck, date_input, mst_partId, mst_supplierId}
            })

            return{
                code: 200,
                data:{
                    dos
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

    deleteDo = async (req)=>{
        try {
            const {id} = req.params
            const dos = await this.db.tb_do.delete({
                where:{
                    id_do: Number(id)
                }
            })
            return{
                code: 200,
                data:{
                    dos
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

    updateDo = async (req)=>{
        try {
            const {id} = req.params
            const dos = await this.db.tb_do.update({
                data: req.body,
                where:{
                    id_do: Number(id)
                },
                include: {
                    mst_parts: true,
                    mst_supplier: true
                }
            })
            return{
                code: 200,
                data:{
                    dos
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

module.exports = (db)=> new _do(db)
