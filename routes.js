const SupplierController = require("./controllers/SupplierController");

const _routes = [
    ['supplier', SupplierController]
]

const routes = (app) => {
    _routes.forEach(router => {
        const [ url, controller ] = router
        app.use(`/api/${url}`, controller)
    });
}

module.exports = routes