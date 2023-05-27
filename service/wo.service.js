const utils = require('./../utils/response')
const debug = process.env.DEBUG

class _wo{

    constructor(db) {
        this.db = db;
    }
    getWo = async (req)=>{
        try {
            const wos = await this.db.Tb_wo.findMany({
                include: {
                    mst_parts: true,
                    mst_suppliers: true,
                  }
            })

            if (!wos){
                return{
                    code: 404,
                    error: 'Sorry, Product Not Found'
                }
            }

            return{
                code: 200,
                status: true,
                data: [wos]
            }
        } catch (error) {
            if (debug){
                console.error('Error Get Wo', error)
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
            const suppliers = await this.db.Mst_supplier.findMany({
                include:{tb_wos: true}
            })

            return{
                code: 200,
                status: true,
                data: [suppliers]
            }
        } catch (error) {
            if (debug){
                console.error('Error Get suppliers', error)
            }
            return {
                code: 500,
                status: false,
                error
            }
        }
    }

    getPart = async (req)=>{
        try {
            const parts = await this.db.Mst_part.findMany({
                include:{tb_wos: true}
            })

            return{
                code: 200,
                status: true,
                data: [parts]
            }
        } catch (error) {
            if (debug){
                console.error('Error Get parts', error)
            }
            return {
                code: 500,
                status: false,
                error
            }
        }
    }

    getWoById = async (req)=>{
        try {
            const {id} = req.params
            const wo = await this.db.Tb_wo.findUnique({
                where:{
                    id: Number(id)
                },
                include: {
                    mst_parts: true,
                    mst_suppliers: true,
                  }
            })

            if (!wo){
                return{
                    code: 404
                }
            }
            return{
                code: 200,
                status: true,
                data: wo
            }
        } catch (error) {
            if (debug){
                console.error('Error Get Wo By Id', error)
            }
            return {
                code: 500,
                status: false,
                error
            }
        }
    }

    addWo = async (req)=>{
        try {
            const {qty_kbn, qty_order, date_input, mst_partId, mst_supplierId} = req.body

            const wo = await this.db.Tb_wo.create({
                data: {qty_kbn, qty_order, date_input, mst_partId, mst_supplierId}
            })

            return{
                code: 200,
                data:{
                    wo
                }
            }
        } catch (error) {
            if (debug){
                console.error('Error Add Wo By Id', error)
            }

            if (error.code === 'P2002') {
                // Error Duplicate
                return {
                    code: 400,
                    status: "Unique",
                    error: 'Sorry, Duplicate name wo'
                }
            }

            return {
                code: 500,
                status: false,
                error
            }
        }
    }

    deleteWo = async (req)=>{
        try {
            const {id} = req.params
            const wo = await this.db.Tb_wo.delete({
                where:{
                    id: Number(id)
                }
            })
            return{
                code: 200,
                data:{
                    wo
                }
            }
        } catch (error) {
            if (debug){
                console.error('Error Add Wo By Id', error)
            }

            if (error.code === 'P2025'){
                return {
                    code: 400,
                    status: false,
                    error: error.meta.cause? `Sorry, ${error.meta.cause }`: `Internal Server`
                }
            }
            return {
                code: 500,
                status: false,
                error
            }
        }
    }

    updateWo = async (req)=>{
        try {
            const {id} = req.params
            const wo = await this.db.Tb_wo.update({
                data: req.body,
                where:{
                    id: Number(id)
                },
                include: {
                    mst_parts: true,
                    mst_suppliers: true,
                  }
            })
            return{
                code: 200,
                data:{
                    wo
                }
            }
        } catch (error) {
            if (debug){
                console.error('Error Update Wo By Id', error)
            }

            if (error.code === 'P2002') {
                // Error Duplicate
                return {
                    code: 400,
                    status: false,
                    error: error.meta.cause? `Sorry, ${error.meta.cause }`: `Internal Server`
                }
            }
            return {
                code: 500,
                status: false,
                error
            }
        }
    }


    // penjumlahan = async (a, b)=>{
    //     let jumlah
    //     try{
    //         jumlah =  a+b
    //     }catch (error){
    //         console.log('Error Penjumlahan', error)
    //     }

    //     return jumlah
    // }


}

module.exports = (db)=> new _wo(db)