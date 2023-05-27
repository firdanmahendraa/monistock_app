const supplierController = require('./../controllers/supplier.controller')
const publicController = require('./../controllers/public.controller')

const _routes = [
    ['/supplier',supplierController],
    ['/public',publicController]
]

const routes = (app, db)=>{
    _routes.forEach((route)=>{
        const [url, controller] = route
        app.use(`/api${url}`, controller(db))
    })
}

module.exports = routes;