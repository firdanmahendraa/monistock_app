const utils = require('./../utils/response')
const debug = process.env.DEBUG

class _rack{

    constructor(db) {
        this.db = db;
    }
    getRack = async (req)=>{
        try {
            const rack = await this.db.mst_rack.findMany()

            if (!rack){
                return{
                    code: 404,
                    error: 'Sorry, Rack Not Found'
                }
            }

            return{
                code: 200,
                status: true,
                data: [rack]
            }
        } catch (error) {
            if (debug){
                console.error('Error Get Rack', error)
            }
            return {
                code: 500,
                status: false,
                error
            }
        }
    }

    getRackById = async (req)=>{
        try {
            const {id} = req.params
            const rack = await this.db.mst_rack.findUnique({
                where:{
                    id_rack: Number(id)
                }
            })

            if (!rack){
                return{
                    code: 404,
                    error: 'Sorry, Rack Not Found'
                }
            }
            return{
                code: 200,
                status: true,
                data: rack
            }
        } catch (error) {
            if (debug){
                console.error('Error Get Rack By Id', error)
            }
            return {
                code: 500,
                status: false,
                error
            }
        }
    }

    addRack = async (req)=>{
        try {
            const {rack_no} = req.body

            const rack = await this.db.mst_rack.create({
                data: {rack_no}
            })

            return{
                code: 200,
                data:{
                    rack
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

    deleteRack = async (req)=>{
        try {
            const {id} = req.params
            const rack = await this.db.mst_rack.delete({
                where:{
                    id_rack: Number(id)
                }
            })
            return{
                code: 200,
                data:{
                    rack
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

    updateRack = async (req)=>{
        try {
            const {id} = req.params
            const rack = await this.db.mst_rack.update({
                data: req.body,
                where:{
                    id_rack: Number(id)
                },
            })
            return{
                code: 200,
                data:{
                    rack
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

module.exports = (db)=> new _rack(db)
