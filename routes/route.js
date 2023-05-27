const supplierController = require('./../controllers/supplier.controller')
const doController = require('./../controllers/do.controller')
const publicController = require('./../controllers/public.controller')

const _routes = [
    ['/supplier',supplierController],
    ['/do',doController],
    ['/public',publicController]
]

const routes = (app, db)=>{
    _routes.forEach((route)=>{
        const [url, controller] = route
        app.use(`/api${url}`, controller(db))
    })
}

module.exports = routes;